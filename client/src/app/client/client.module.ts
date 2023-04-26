import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientContainer } from './components/client/client.container';
import { ClientRoutingModule } from './client-routing.module';



@NgModule({
  declarations: [
    ClientContainer
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
