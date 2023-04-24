import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SwiperModule } from 'swiper/angular';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faR, faB } from '@fortawesome/free-solid-svg-icons';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SwiperModule, CommonModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Network,EmailComposer,FileOpener,File,Diagnostic,HTTP],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
