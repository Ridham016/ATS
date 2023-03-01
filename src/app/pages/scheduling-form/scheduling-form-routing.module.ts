import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulingFormPage } from './scheduling-form.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulingFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulingFormPageRoutingModule {}
