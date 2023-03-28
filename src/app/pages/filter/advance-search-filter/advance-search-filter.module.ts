import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvanceSearchFilterPageRoutingModule } from './advance-search-filter-routing.module';

import { AdvanceSearchFilterPage } from './advance-search-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvanceSearchFilterPageRoutingModule
  ],
  declarations: [AdvanceSearchFilterPage]
})
export class AdvanceSearchFilterPageModule {}
