import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http/ngx";
import { Applicant } from '../Model/applicant-details';

import { LoadingController, AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  Activelist: any[] = [];
  baseUrl='https://b3c1-2402-3a80-e73-412f-a942-b8a6-5a27-222f.in.ngrok.io/api/';
  constructor(private api:HTTP,
    private loadingController:LoadingController ,
    private plt : Platform,
    private alertController: AlertController
    ) {
      this.plt.ready().then(_=>{
        this.api.setHeader('Access-Control-Allow-Origin',this.baseUrl,'');
      })

  }

  getApplicantsData(PageNumber:number,PageSize:number=23){
    const g={
      'CurrentPageNumber':PageNumber,
      'PageSize':PageSize
    }
    return this.api.post(this.baseUrl+'Registrations/GetAllApplicants',g,{})
  }

  createApplicant(g:Applicant){
    this.api.post(this.baseUrl+'/Registrations/Register',g,{}).then(
      res=>{
        console.log(res)
      }
    ).catch(error=>{
      console.log(error)
      this.showAlertF();
    });
  }

  updateApplicant(g:Applicant,id:number){
    this.api.post(this.baseUrl+'/Registrations/Register/',g,{}).then(
      res=>{
        console.log(res)
      }
    ).catch(error=>{
      console.log(error)
      this.showAlertF();
    });
  }

  async showLoader() {
    const loading = await this.loadingController.create({
      cssClass: 'custom-loading',
      translucent:true,
      duration:1500,
    });
    await loading.present();

  }
  async hideLoader() {
    const loading = await this.loadingController.getTop();
    if (loading) {
      await loading.dismiss();
    }
  }

  async showAlertF() {
    const alert = await this.alertController.create({
      header: 'Server Down',
      message: 'Please Contact Harsh Dudhat',
      buttons: ['OK']
    });
     await alert.present();
  }

  async getApplicant(id:number){
   const param={
      'ApplicantId':id
    }
    return this.api.get(this.baseUrl+'Registrations/GetApplicantById',param,{})
  }

}
