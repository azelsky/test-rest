import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const api = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private _http: HttpClient) { }

  public getWaiterId(accountId: string, tableId: string) {
    return this._http.get(`${api}/${accountId}/my-waiter/${tableId}`)
  }
}
