import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import * as stock from '../../e2e/src/stock.json';
import { Stock } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Stock tracking';
  temp: any[] = (stock as any).default;
  constructor(private apiService: ApiService) { }

  ngOnInit() { }

  persist() {
    return this.temp.forEach((item) => {
      const toSave = { ...item };
      delete toSave.id;
      this.apiService.createItem(toSave, 'http://localhost:9000/stock/')
        .subscribe((created: any) => created)
    });
  }
}
