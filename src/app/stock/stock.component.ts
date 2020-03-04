import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Stock } from '../interfaces';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  stock: Stock[] = [];
  constructor(private apiService: ApiService) { }
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
  }

}
