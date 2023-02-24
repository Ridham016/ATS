import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDashBoardPage } from './user-dash-board.page';

const routes: Routes = [
  {
    path: '',
    component: UserDashBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashBoardPageRoutingModule {}
