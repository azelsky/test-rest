import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../../services/connection.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.container.html',
  styleUrls: ['./client.container.scss']
})
export class ClientContainer implements OnInit{
  waiterId: number | null = null;

  constructor(
    public connection: ConnectionService,
    public clientService: ClientService
  ) {

  }

  ngOnInit() {
    const tableId = 45; // value from DB
    const accountId = 'sushi_house'; // value from DB
    this.clientService.getWaiterId(accountId, tableId.toString()).subscribe((res: any) => {
      this.waiterId = res.waiterId;
      this.connection.socket.auth = {
        name: 'Stefan',
        table: 5,
        waiterId: res.waiterId
      }
      this.connection.socket.connect();
    })
  }

  call() {
    this.connection.sendMessage('Please come', <number>this.waiterId)
  }
}
