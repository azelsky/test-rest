import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/esm/socket';

export interface IGuest {
  id: string, name: string
}
export interface IRequest {
  tableId: number;
  from: IGuest
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public error$: BehaviorSubject<string> = new BehaviorSubject('');
  public isGuest$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public requests$: BehaviorSubject<IRequest[]> = new BehaviorSubject<IRequest[]>([]);
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

  public getRequests() {
    this.socket.on('requestToSitAtTheTable', (res: any) => {
      this.requests$.next([...this.requests$.value, res])
    });

    return this.requests$.asObservable();
  }

  public allowToSitAtTheTable(tableId: number, guest: IGuest) {
    // toDO add decline
    this.socket.emit('allowToSitAtTheTable', {
      tableId,
      guest
    })
  }

  public requestToSitAtTheTable(tableId: number, waiterId: number, name: string, id: string) {
    this.socket.emit('requestToSitAtTheTable', {
      tableId,
      waiterId,
      name,
      id
    })
  }

  public isGuest() {
    this.socket.on('allowToSitAtTheTable', () => {
      this.isGuest$.next(true)
    })

    return this.isGuest$.asObservable();
  }
}
