import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvanceSearchPage } from './advance-search.page';

const routes: Routes = [
  {
    path: '',
    component: AdvanceSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvanceSearchPageRoutingModule {}
