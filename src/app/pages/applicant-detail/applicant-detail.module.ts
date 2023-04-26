import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantDetailPageRoutingModule } from './applicant-detail-routing.module';

import { ApplicantDetailPage } from './applicant-detail.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    ApplicantDetailPageRoutingModule
  ],
  declarations: [ApplicantDetailPage]
})
export class ApplicantDetailPageModule {}
