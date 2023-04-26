import { Component } from '@angular/core';
import { ConnectionService } from '../../../services/connection.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.container.html',
  styleUrls: ['./client.container.scss']
})
export class ClientContainer {
  constructor(public connection: ConnectionService) {
  }

  call() {
    this.connection.sendMessage('call')
  }

  connect() {
    this.connection.socket.auth = {
      name: 'Stefan',
      table: 5
    }
    this.connection.socket.connect();
  }
}
