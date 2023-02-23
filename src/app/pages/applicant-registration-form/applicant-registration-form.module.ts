import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { ApplicantRegistrationFormPageRoutingModule } from './applicant-registration-form-routing.module';

import { ApplicantRegistrationFormPage } from './applicant-registration-form.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantRegistrationFormPageRoutingModule,
    SwiperModule
  ],
  declarations: [ApplicantRegistrationFormPage]
})
export class ApplicantRegistrationFormPageModule {}
