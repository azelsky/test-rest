import { Component } from '@angular/core';
import { ConnectionService } from '../../../services/connection.service';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.container.html',
  styleUrls: ['./waiter.container.scss']
})
export class WaiterContainer {
  constructor(public connection: ConnectionService) {
    this.connection.socket.auth = {isWaiter: true}
    this.connection.socket.connect();
  }
}
