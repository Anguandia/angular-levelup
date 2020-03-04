import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Stock } from '../interfaces';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {

  item: Stock;
  id: string = window.location.pathname.split('/').reverse()[1];
  message: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getItem(this.id)
      .subscribe((data: any) => this.item = data.data);
   }

}
