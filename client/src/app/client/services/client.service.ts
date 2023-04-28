import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IGetWaiterIdRes {
  waiterId: string
}

const api = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private _http: HttpClient) { }

  public getWaiterId(tableId: string) {
    return this._http.get<IGetWaiterIdRes>(`${api}/get-waiter/${tableId}`)
  }
}
