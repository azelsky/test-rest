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
      id: 'a3483690-f194-4fc2-b364-879d92720842' // the save in DB
    }
    this.connection.socket.connect();

    this.requests$ = this.connection.getRequests();
  }

  submit(data: IRequest) {
    this.connection.allowToSitAtTheTable(data.from.id);

    this.connection.requests$.next(this.connection.requests$.value.filter(request => request.from.id !== data.from.id
    ))
  }
}
