import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantRegistrationFormPage } from './applicant-registration-form.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicantRegistrationFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantRegistrationFormPageRoutingModule {}
