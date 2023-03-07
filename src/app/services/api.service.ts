import { UserDashBoardPageModule } from './../pages/user-dash-board/user-dash-board.module';
import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http/ngx";
import { Applicant } from '../Model/applicant-details';

import { LoadingController, AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { CustomAlertService } from './custom-alert.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  Activelist: any[] = [];
  CopyActivelist: any[] = [];
  list:any
  UploadApplicantId:number=0;
  retryValue=5;

  baseUrl='https://0138-116-72-9-56.in.ngrok.io/api/';
  constructor(private api:HTTP,
    private loadingController:LoadingController ,
    private plt : Platform,
    private alertController: AlertController,
    private alertServices :CustomAlertService
    ) {
      this.plt.ready().then(_=>{
        this.api.setHeader('Access-Control-Allow-Origin',this.baseUrl,'');
        this.api.setHeader("retry",this.retryValue.toString(),'');
        this.api.setRequestTimeout(10.0)
      })

  }

  getApplicantsData(PageNumber:number,PageSize:number=23){

    const g={
      'CurrentPageNumber':PageNumber,
      'PageSize':PageSize,
      'IsAscending':true,
      'OrderByColumn': 'FirstName'
    }
    return this.api.post(this.baseUrl+'Registrations/GetApplicantList',g,{})

  }

  createApplicant(g:Applicant,formdata:any=''){
    this.api.post(this.baseUrl+'Registrations/Register',g,{}).then(
      res=>{
        console.log('create:-',res)
        this.api.setDataSerializer('json');
        this.list=JSON.parse(res.data)
        this.UploadApplicantId=this.list['Result']

        this.api.setDataSerializer('multipart');
        this.api.post(this.baseUrl+'Upload/UploadFile?databaseName=ATS',formdata,{}).then(
            Upload_res=>{

             this.api.setDataSerializer('json');
              this.list=JSON.parse(Upload_res.data)
              console.log(this.list)

              this.list=this.list['Result']

              console.log(this.list)

              const g={
                FileName:this.list.FileName,
                FilePath:this.list.FilePath
              }
              this.api.post(this.baseUrl+'Registrations/FileUpload?ApplicantId='+this.UploadApplicantId,g,{}).then(
                response=>{
                  console.log('Database Res:-',response)
                }
              ).catch( error=>console.log('Database:-',error));
            }
        ).catch(error=>{
             console.log('Upload Error:- ',error)
        });

      }
    ).catch(error=>{
      console.log('CreateError:- ',error)
      this.showAlertF();
    });
  }

  updateApplicant(g:Applicant,id:number){
    this.api.post(this.baseUrl+'Registrations/Register/',g,{}).then(
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
