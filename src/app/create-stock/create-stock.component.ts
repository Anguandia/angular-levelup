import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { throwError } from 'rxjs';
import { WebSocketService } from '../web-socket.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent implements OnInit {

  submit = this.createItem;
  action = 'Add';
  updateState = (...data) => Object.assign(this, ...data);

  @Input() data = {
    name: '', unitPrice: '', quantity: null, image: '',
    id: '', createdAt: null, updatedAt: null
  };
  constructor(
    private apiService: ApiService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit() { }

  createItem() {
    this.apiService.createItem(this.data)
      .subscribe((created?: any) => {
        Object.assign(this, created);
        this.webSocketService.emit('notification', created);
      },
        (error) => {
          Object.assign(this, error.error);
      });
  }

  emitEvent() {
    this.webSocketService.emit('typing', { message: 'An item is being added ...' });
  }

  stop() {
    this.webSocketService.emit('typing', { message: null });
  }

}
