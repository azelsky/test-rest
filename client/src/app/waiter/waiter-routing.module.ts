import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaiterContainer } from './components/waiter/waiter.container';

const routes: Routes = [
  {
    path: '',
    component: WaiterContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaiterRoutingModule {}
