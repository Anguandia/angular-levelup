import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Stock } from '../interfaces';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  stock: Stock[] = [];

  constructor(
    private apiService: ApiService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit() {
    let headers: {};
    this.apiService.getStock()
      .subscribe((res: any) => {
        const keys = res.headers.keys();
        headers = keys.map(key =>
          `${key}: ${res.headers.get(key)}`);
        Object.assign(res, headers);
        this.stock = res.body.data;
      });
    this.webSocketService.listen('notification')
      .subscribe((data: any) => {
        if (data.id) {
          const deletedIndex = this.stock.findIndex((e) => e.id === data.id);
          this.stock.splice(deletedIndex, 1);
        }
        if (data.data) {
          Object.assign(data.data, { highlight: 'error' })
          this.stock.push(data.data);
        }
        if (data.update) {
          Object.assign(data.update, {highlight: 'error'})
          const deletedIndex = this.stock.findIndex((e) => e.id === data.update.id);
          this.stock.splice(deletedIndex, 1, data.update);
        }
      });
  }

}
