import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Stock } from '../interfaces';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  id: string = window.location.pathname.split('/').reverse()[1];
  message: string;
  messageClass: string;
  name: string;

  constructor(
    private apiService: ApiService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit() {
    this.apiService.getItem(this.id)
      .subscribe((res: any) => {
        this.name = res.body.data.name;
      });
  }

  public deleteItem() {
    this.apiService.deleteItem(this.id).subscribe((res) => {
      [this.message, this.messageClass] = res
      ? [`Item ${this.name} ${res.message}`, 'success']
      : ['An error occured, please try again', 'error'];
      const [message, id] = [`Item ${this.name} deleted`, this.id];
      this.webSocketService.emit('notification', {message, id});
    });
  }

  // notify(deleted) {
  //   this.webSocketService.emit('notification', deleted);
  // }

}
