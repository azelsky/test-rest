import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../../services/connection.service';
import { ClientService } from '../../services/client.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.container.html',
  styleUrls: ['./client.container.scss']
})
export class ClientContainer implements OnInit{
  tableId: string | null = null;
  id: string | null = null;
  isGuest$!: Observable<boolean>;

  constructor(
    public connection: ConnectionService,
    public clientService: ClientService
  ) {
    this.isGuest$ = this.connection.isGuest();
  }

  ngOnInit() {
    this.tableId = '422a76c9-24c8-417f-a37b-5532fbbecb11';
    const name = 'Stefan'; // random

    this.id = localStorage.getItem('id');

    this.connection.socket.auth = {
      id: this.id,
      name,
      tableId: this.tableId
    }
    this.connection.socket.connect();

    this.connection.setId$.subscribe((id: string) => {
      this.id = id;

      localStorage.setItem('id', id);
    })
  }

  call() {
    this.connection.callWaiter('Please come', <string>this.tableId)
  }
}
