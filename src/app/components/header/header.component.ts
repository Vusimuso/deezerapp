import { Component, OnInit } from '@angular/core';
import {ListItemsService} from '../../services/list-items.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'musicdb-app';
  function: any;

  constructor(
    private listItemsService: ListItemsService
  ) { }

  ngOnInit() {
    this.listItemsService.searchItems('0');
  }

}
