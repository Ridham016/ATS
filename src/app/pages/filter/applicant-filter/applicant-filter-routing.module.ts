import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantFilterPage } from './applicant-filter.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantFilterPageRoutingModule {}
