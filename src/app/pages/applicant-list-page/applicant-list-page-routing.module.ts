import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantListPagePage } from './applicant-list-page.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantListPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantListPagePageRoutingModule {}
