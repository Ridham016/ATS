import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvanceSearchFilterPage } from './advance-search-filter.page';

const routes: Routes = [
  {
    path: '',
    component: AdvanceSearchFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvanceSearchFilterPageRoutingModule {}
