import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Stock } from '../interfaces';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-update-item',
  templateUrl: '../create-stock/create-stock.component.html',
  styleUrls: ['../create-stock/create-stock.component.css']
})
export class UpdateItemComponent implements OnInit {

  id: string = window.location.pathname.split('/').reverse()[1];
  existing = { name: '' };
  submit = this.updateItem;
  action = `Update`;

  @Input() data = {
    name: '', quantity: '', unitPrice: '', image: '',
    id: '', createdAt: null, updatedAt: null
  };

  constructor(
    private apiService: ApiService,
    private webSocketService: WebSocketService
  ) { }
  ngOnInit() {
    this.apiService.getItem(this.id).subscribe((res: any) => {
      if (res.body.data) {
        this.existing = res.body.data;
        // display current values in form
        Object.assign(this.data, this.existing);
      }
    });
  }

  public updateItem() {
    const update: any = {};
    Object.keys(this.data)
    .filter((key) => this.data[key] !== this.existing[key])
    .forEach((key) => update[key] = this.data[key]);
    this.apiService.updateItem(update, this.id)
      .subscribe((resp) => {
        this.updateState(resp);
        console.log(this, 'ttttt');
        this.webSocketService.emit('notification', resp);
      },
        (error) => this.updateState(error.error),
      );
  }

  emitEvent(elt = null) {
    this.webSocketService.emit('typing', {message: `The ${elt.target.name} of item ${this.existing.name} is being modified`})
  }

  stop() {
    this.webSocketService.emit('typing', {message: null});
  }

  private updateState = (...data) => Object.assign(this, ...data);

}
