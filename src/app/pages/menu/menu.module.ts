import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserRoleComponent } from 'src/app/components/user-role/user-role.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage,UserRoleComponent]
})
export class MenuPageModule {}
