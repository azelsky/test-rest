import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/esm/socket';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public error$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket: Socket = io('http://localhost:3000', {autoConnect: false});

  public sendMessage(message: string, to: number) {
    console.log('sendMessage: ', message)
    this.socket.emit('message', {
      message,
      to
    });
  }

  public getNewMessage() {
    this.socket.on('message', (message) =>{
      console.log('new message', message)
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  public getErrors() {
    this.socket.on('connect_error', (err) => {
      if (err.message === 'table is required') {
        this.error$.next(err.message)
      }
    })

    return this.error$.asObservable();
  }
}
