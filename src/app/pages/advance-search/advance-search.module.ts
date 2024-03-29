import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';


import { IonicModule } from '@ionic/angular';

import { AdvanceSearchPageRoutingModule } from './advance-search-routing.module';

import { AdvanceSearchPage } from './advance-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvanceSearchPageRoutingModule,
    SwiperModule
  ],
  declarations: [AdvanceSearchPage]
})
export class AdvanceSearchPageModule {}
