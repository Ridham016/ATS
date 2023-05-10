import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobDescriptionPageRoutingModule } from './job-description-routing.module';

import { JobDescriptionPage } from './job-description.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    IonicModule,
    JobDescriptionPageRoutingModule
  ],
  declarations: [JobDescriptionPage]
})
export class JobDescriptionPageModule {}
