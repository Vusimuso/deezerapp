import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../../models/list-items';
import { ListItemsService } from '../../services/list-items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public playlists$: Observable<Playlist[]>;

  constructor(
    private router: Router,
    private listItemsService: ListItemsService
  ) { }

  ngOnInit() {
    this.playlists$ = this.listItemsService.getAllPlaylist('5');
  }

  public goPlaylist(id: number) {
    this.router.navigate(['playlist', id]);
  }
}
