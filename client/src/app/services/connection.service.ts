import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/esm/socket';

export interface IGuest {
  id: string, name: string
}
export interface IRequest {
  tableId: string;
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
  public setId$: Subject<string> = new Subject<string>();
  constructor() {}

  socket: Socket = io('http://localhost:3000', {autoConnect: false});

  public callWaiter(message: string, tableId: string) {
    this.socket.emit('callWaiter', {
      message,
      tableId
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

  public allowToSitAtTheTable(guestId: string) {
    // toDO add decline
    this.socket.emit('allowToSitAtTheTable', {
      guestId
    })
  }

  public isGuest() {
    this.socket.on('allowToSitAtTheTable', (id: string) => {
      this.isGuest$.next(true);
      this.setId$.next(id);
    })

    return this.isGuest$.asObservable();
  }
}
