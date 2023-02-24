import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http/ngx";
import { Applicant } from '../Model/applicant-details';

import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl='https://331a-2409-4041-6eb9-35e0-88fd-68e1-3cb8-4d4d.in.ngrok.io/api/';
  constructor(private api:HTTP,
    private loadingController:LoadingController ,private plt : Platform) {
      this.plt.ready().then(_=>{
        this.api.setHeader('Access-Control-Allow-Origin',this.baseUrl,'');
        this.api.setRequestTimeout(5.0);
      })

  }

  getApplicantsData(){
    return this.api.get(this.baseUrl+'Registrations/GetAllApplicants',{},{})
  }

  createApplicant(g:Applicant){
    this.api.post(this.baseUrl+'/Registrations/Register',g,{}).then(
      res=>{
        console.log(res)
      }
    ).catch(error=>console.log(error));
  }

  updateApplicant(g:Applicant,id:number){
    this.api.post(this.baseUrl+'/Registrations/Register/',g,{}).then(
      res=>{
        console.log(res)
      }
    ).catch(error=>console.log(error));
  }

  async showLoader() {
    const loading = await this.loadingController.create({
      cssClass: 'custom-loading',
    });
    await loading.present();

  }
  async hideLoader() {
    const loading = await this.loadingController.getTop();
    if (loading) {
      await loading.dismiss();
    }
  }
}
