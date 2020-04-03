import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import * as stock from '../../e2e/src/stock.json';
import { Stock } from './interfaces';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Stock tracking';
  temp: any[] = (stock as any).default;
  notification: string;
  notifications: string[] = [];
  count: number = 0;

  constructor(
    private apiService: ApiService,
    private webSocketService: WebSocketService
  ) { }

  
  ngOnInit() { 
    this.webSocketService.listen('typing')
      .subscribe((data: string) => this.notification = data);
    this.webSocketService.listen('notification')
      .subscribe((data: any) => {
        this.notifications.push(data.message);
        this.notification = data.message;
        this.count += 1;
      });
  };

  persist() {
    return this.temp.forEach((item) => {
      const toSave = { ...item };
      delete toSave.id;
      this.apiService.createItem(toSave, 'http://localhost:9000/stock/')
        .subscribe((created: any) => created)
    });
  }
}
