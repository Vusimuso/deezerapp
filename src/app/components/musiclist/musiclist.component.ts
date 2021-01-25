import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Playlist, Track } from '../../models/list-items';
import { ActivatedRoute } from '@angular/router';
import { ListItemsService } from '../../services/list-items.service';

@Component({
  selector: 'app-musiclist',
  templateUrl: './musiclist.component.html',
  styleUrls: ['./musiclist.component.scss']
})
export class MusiclistComponent implements OnInit {

  private params$: Subscription;
  private playlist$: Subscription;
  private tracks$: Subscription;

  public totalCount: number;
  public id: string;
  public playlist: Playlist;
  public tracks: Track[];
  public rows = 10;
  public page = 0;
  public itemSize = 100;
  public scrollHeight = 500;

  constructor(
    private route: ActivatedRoute,
    private listItemsService: ListItemsService,
  ) { }

  ngOnInit() {
    this.params$ = this.route.params.subscribe(params => this.id = params.id ? params.id : null);
    this.playlist$ = this.listItemsService.getPlaylist(this.id).subscribe(playlist => this.playlist = playlist);
    this.getData(0, this.rows);
  }

  private getData(index: number, rows: number): void {
    this.tracks$ = this.listItemsService.getTracks(this.id, index, rows).subscribe(res => {
      const data: Track[] = res.data;
      if (!this.tracks && index === 0) {
        this.totalCount = res.total;
        this.tracks = Array.from({length: this.totalCount});
      }
      const arr = [...this.tracks];
      for (let i = index, j = 0; i < (index + rows); i++, j++) {
        if (i >= this.totalCount) {
          break;
        }
        arr[i] = data[j];
      }
      this.tracks = arr;
    });
  }
}
