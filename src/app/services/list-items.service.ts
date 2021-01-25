import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EndpointResponse, Playlist, Track } from '../models/list-items';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListItemsService {

  private usersList = `${environment.endpoint}/user`;
  private trackList = `${environment.endpoint}/playlist`;
  private searchOption = `${environment.endpoint}/search?q=`;

  constructor(private http: HttpClient) { }

  public getAllPlaylist(id: string): Observable<Playlist[]> {
    return this.http.jsonp<EndpointResponse>(`${this.usersList}/${id}/playlists?output=jsonp`, 'callback').pipe(
      map(res => res.data.map(item => this.mappingPlaylist(item)))
    );
  }

  public getPlaylist(id: string): Observable<Playlist> {
    return this.http.jsonp<any>(`${this.trackList}/${id}?output=jsonp`, 'callback').pipe(
      map(res => this.mappingPlaylist(res))
    );
  }

  public searchItems(item: string): Observable<Playlist> {
    return this.http.jsonp(`${this.searchOption}{item}?output=jsonp`, 'callback').pipe(
      map(res => this.mappingPlaylist(res))
    );
    console.log('res');
  }

  public getTracks(id: string, index: number, rows: number): Observable<EndpointResponse> {
    return this.http.jsonp<EndpointResponse>(`${this.trackList}/${id}/tracks?index=${index}&limit=${rows}&output=jsonp`, 'callback').pipe(
      map(res => {
        res.data = res.data.map(item => new Track(
          item.id,
          item.title,
          item.artist.name,
          item.duration
        ));
        return res;
      })
    );
  }
  private mappingPlaylist(item): Playlist {
    return new Playlist(
      item.id,
      item.title,
      item.picture_big,
      item.creator,
      item.creation_date,
      item.duration
    );
  }
}
