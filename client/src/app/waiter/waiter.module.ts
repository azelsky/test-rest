import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterContainer } from './components/waiter/waiter.container';
import { WaiterRoutingModule } from './waiter-routing.module';

@NgModule({
  declarations: [
    WaiterContainer
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule
  ]
})
export class WaiterModule { }
