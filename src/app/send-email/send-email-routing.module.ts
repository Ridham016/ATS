import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendEmailPage } from './send-email.page';

const routes: Routes = [
  {
    path: '',
    component: SendEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendEmailPageRoutingModule {}
