import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class CustomAlertService {

  constructor(private alertController: AlertController) { }

  async successAlert(header: string, message: string, buttons: any[] = ['OK'])
  {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
      cssClass: 'sucessalert'
    });
    await alert.present();
  }
  async normalAlert(header: string, message: string, buttons: any[] = ['OK'])
  {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
    });
    await alert.present();
  }

  async dangerAlert( message?: string, buttons: any[] = ['OK',{
    text: 'Cancel',
    role: 'cancel'
  }]) {
    const alert = await this.alertController.create({
      header: 'Are YOu Sure??',
      message: message,
      buttons: buttons,
      cssClass: 'dangeralert'

    });
    await alert.present();
  }



}
