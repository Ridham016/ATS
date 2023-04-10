import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionHistoryPage } from './action-history.page';

const routes: Routes = [
  {
    path: '',
    component: ActionHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionHistoryPageRoutingModule {}
