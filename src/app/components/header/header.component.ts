import { Component, OnInit } from '@angular/core';
import {ListItemsService} from '../../services/list-items.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'musicdb-app';
  filter: any = [];
  filterValue: string;

  constructor(
    private listItemsService: ListItemsService
  ) { }

  ngOnInit() {
  }

  searchItem(event: any): void {
    this.filter = this.listItemsService.searchItems(this.filterValue);
    console.log(this.filterValue);

  }
}
