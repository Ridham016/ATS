import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { SwiperModule } from 'swiper/angular';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SwiperModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },EmailComposer],
  bootstrap: [AppComponent],
})
export class AppModule {}
