import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulingFormPageRoutingModule } from './scheduling-form-routing.module';

import { SchedulingFormPage } from './scheduling-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulingFormPageRoutingModule
  ],
  declarations: [SchedulingFormPage]
})
export class SchedulingFormPageModule {}
