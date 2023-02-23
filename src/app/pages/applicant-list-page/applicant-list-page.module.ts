import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantListPagePageRoutingModule } from './applicant-list-page-routing.module';

import { ApplicantListPagePage } from './applicant-list-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantListPagePageRoutingModule
  ],
  declarations: [ApplicantListPagePage]
})
export class ApplicantListPagePageModule {}
