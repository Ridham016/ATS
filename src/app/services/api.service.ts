
import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http/ngx";
import { Applicant, Scheduling } from '../Model/applicant-details';

import { LoadingController, AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { CustomAlertService } from './custom-alert.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  Activelist: any[] = [];
  list:any
  UploadApplicantId:number=0;
  retryValue=5;
  UploadStatusId?:number;
  StartDate?:string;
  EndDate?:string;

  baseUrl='https://e9df-2402-3a80-16af-53b0-ddd-b390-c5a3-51f6.in.ngrok.io/api/';
  baseUrldownload =this.baseUrl+'/Attachments/Temp/';
  constructor(private api:HTTP,
    private loadingController:LoadingController ,
    private plt : Platform,
    private alertController: AlertController,
    private alertServices :CustomAlertService
    ) {
      this.plt.ready().then(_=>{
        this.api.setHeader('Access-Control-Allow-Origin',this.baseUrl,'');
        this.api.setRequestTimeout(10.0)
      })

  }

  getApplicantsData(PageNumber:number,statusId?:number,PageSize:number=4,IsAscending:boolean=true,OrderByColumn='FirstName'){

    const g={
      'CurrentPageNumber':PageNumber,
      'PageSize':PageSize,
      'IsAscending':IsAscending,
      'OrderByColumn': OrderByColumn,
      'StatusId':statusId
    }
    console.log(g)
    return this.api.post(this.baseUrl+'Schedules/GetApplicantsParam',g,{})

  }
  getActionList(PageNumber:number,statusId?:number,StartDate?:string,EndDate?:string,PageSize:number=4){

    const g={
      'CurrentPageNumber':PageNumber,
      'PageSize':PageSize,
    }
    console.log(g,statusId,StartDate,EndDate)
    return this.api.post(this.baseUrl+'AdvancedSearch/AdvancedActionSearch?StatusId='+statusId+'&StartDate='+StartDate+'&EndDate='+EndDate,g,{})

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
      spinner: null,
      cssClass:'custom-loading',
      message: '<div class="spinner"><div></div><div></div><div></div><div></div><div></div></div>',
      translucent:true,
      duration:10
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
      header: 'Error Retriving list',
      message: 'Please retry',
      buttons: ['OK']
    });
     await alert.present();
  }
  async showAlertdownloadF() {
    const alert = await this.alertController.create({
      header: 'file not downloaded ',
      message: 'Please try again !!',
      buttons: ['OK']
    });
     await alert.present();
  }
  async showAlertdownloadS() {
    const alert = await this.alertController.create({
      header: 'file  downloaded ',
      buttons: ['OK']
    });
     await alert.present();
  }

  async getApplicant(id:number){
   const param={
      'ApplicantId':id
    }
    return this.api.get(this.baseUrl+'Schedules/GetApplicant',param,{})
  }
  async getActiveActionButton(id:number){

    return this.api.get(this.baseUrl+'Schedules/GetButtons?StatusId='+id,{},{})
  }

  StatusUpdate(applicantID:number,nextStatusId:number){
    return this.api.post(this.baseUrl+'Schedules/UpdateStatus/?ApplicantId='+applicantID+'&StatusId='+nextStatusId,{},{})

  }

  scheduleMeeting(gg:Scheduling,ActionId:number){
   const g = {
      "Description":gg.Description,
      "ScheduleDateTime":gg.ScheduleDateTime,
      "ScheduleLink":gg.ScheduleLink,
      "InterviewerId": gg.InterviewerId,
      "ActionId": ActionId
   }
   console.log(g);
    return this.api.post(this.baseUrl+'Schedules/ScheduleInterview',g,{} )
  }

  getInterviwer(){
    return this.api.get(this.baseUrl+'Schedules/GetInterviewers',{},{})
  }

  getOtherReasons(){
    return this.api.get(this.baseUrl+'Schedules/GetReasons',{},{})
  }

  upDateReason(actionID:number,resonId:number){
    const g={
      "ReasonId":resonId
    }
    return this.api.post(this.baseUrl+'Schedules/UpdateReason?ActionId='+actionID+'&ReasonId='+resonId,{},{})
  }


  onHoldStatus(actionID:number,desc:string){
    const body={
      "Description":desc
    }
    console.log(body)
    return this.api.post(this.baseUrl+'Schedules/HoldReason?ActionId='+actionID,body,{})
  }

  async downloadFile(filename: string, filePath: string): Promise<void> {
   return await this.api.downloadFile(this.baseUrldownload+filename, {}, {}, filePath);
    }


    getEventDetails(){
      return this.api.get(this.baseUrl+'Dashboard/GetEvents',{},{});
    }
  }


