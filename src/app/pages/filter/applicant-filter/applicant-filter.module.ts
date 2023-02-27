import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantFilterPageRoutingModule } from './applicant-filter-routing.module';

import { ApplicantFilterPage } from './applicant-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantFilterPageRoutingModule
  ],
  declarations: [ApplicantFilterPage]
})
export class ApplicantFilterPageModule {}
