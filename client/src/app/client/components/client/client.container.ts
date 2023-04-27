import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../../services/connection.service';
import { ClientService } from '../../services/client.service';
import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.container.html',
  styleUrls: ['./client.container.scss']
})
export class ClientContainer implements OnInit{
  waiterId: number | null = null;
  id: string = uuid()
  isGuest$!: Observable<boolean>;

  constructor(
    public connection: ConnectionService,
    public clientService: ClientService
  ) {
    this.isGuest$ = this.connection.isGuest();
  }

  ngOnInit() {
    const tableId = 45; // value from DB
    const accountId = 'sushi_house'; // value from DB
    const name = 'Stefan'; // random
    this.clientService.getWaiterId(accountId, tableId.toString()).subscribe((res: any) => {
      this.waiterId = res.waiterId;
      this.connection.socket.auth = {
        id: this.id
      }
      this.connection.socket.connect();

      // toDo maybe user logedIn?????
      this.connection.requestToSitAtTheTable(tableId, res.waiterId, name, this.id)
    })
  }

  call() {
    this.connection.sendMessage('Please come', <number>this.waiterId)
  }
}
