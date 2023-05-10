import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobDescriptionPage } from './job-description.page';

const routes: Routes = [
  {
    path: '',
    component: JobDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobDescriptionPageRoutingModule {}
