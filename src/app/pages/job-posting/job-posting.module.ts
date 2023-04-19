import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobPostingPageRoutingModule } from './job-posting-routing.module';

import { JobPostingPage } from './job-posting.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    IonicModule,
    JobPostingPageRoutingModule
  ],
  declarations: [JobPostingPage]
})
export class JobPostingPageModule {}
