import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDashBoardPageRoutingModule } from './user-dash-board-routing.module';

import { UserDashBoardPage } from './user-dash-board.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDashBoardPageRoutingModule
  ],
  declarations: [UserDashBoardPage]
})
export class UserDashBoardPageModule {}
