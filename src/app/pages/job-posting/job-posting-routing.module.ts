import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobPostingPage } from './job-posting.page';

const routes: Routes = [
  {
    path: '',
    component: JobPostingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPostingPageRoutingModule {}
