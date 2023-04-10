import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionHistoryPageRoutingModule } from './action-history-routing.module';

import { ActionHistoryPage } from './action-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionHistoryPageRoutingModule
  ],
  declarations: [ActionHistoryPage]
})
export class ActionHistoryPageModule {}
