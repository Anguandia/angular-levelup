import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  
  socket: any;
  readonly uri: string = `ws${baseUrl.slice(baseUrl.indexOf(':'), -7)}`;

  constructor() {
    this.socket = io(this.uri);
   }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  } 
}
