import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientContainer } from './components/client/client.container';

const routes: Routes = [
  {
    path: '',
    component: ClientContainer
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
