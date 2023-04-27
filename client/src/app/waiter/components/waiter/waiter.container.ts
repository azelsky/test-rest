import { Component } from '@angular/core';
import { ConnectionService, IRequest } from '../../../services/connection.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.container.html',
  styleUrls: ['./waiter.container.scss']
})
export class WaiterContainer {
  requests$!: Observable<IRequest[]>;

  constructor(public connection: ConnectionService) {
    this.connection.socket.auth = {
      isWaiter: true,
      id: 74 // the save in DB
    }
    this.connection.socket.connect();

    this.requests$ = this.connection.getRequests();
  }

  submit(data: IRequest) {
    this.connection.allowToSitAtTheTable(data.tableId, data.from);

    this.connection.requests$.next(this.connection.requests$.value.filter(request => request.from.id !== data.from.id
    ))
  }
}
