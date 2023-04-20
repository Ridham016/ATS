
import { Injectable, NgModule } from '@angular/core';
import { HTTP } from "@ionic-native/http/ngx";
import { Applicant, Scheduling } from '../Model/applicant-details';
import * as CryptoJS from 'crypto-js';
import { LoadingController, AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { CustomAlertService } from './custom-alert.service';
import { Router } from '@angular/router';

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
  FilePath!:string;
  FileName!:string;
  Token!:string;
  RoleId=1;
  UserName!:string;

  // headers = {
  //   'Authorization': `${this.Token}`,
  //   'Content-Type': 'application/json'
  // };

  baseUrl='https://9b82-61-1-58-16.ngrok-free.app/api/';
  baseUrldownload ='https://9b82-61-1-58-16.ngrok-free.app/Attachments/Temp/';
  constructor(private api:HTTP,
    private loadingController:LoadingController ,
    private plt : Platform,
    private alertController: AlertController,
    private alertServices :CustomAlertService,
    private router:Router,
    ) {
      this.plt.ready().then(_=>{
        this.api.setHeader('Access-Control-Allow-Origin',this.baseUrl,'');
        this.api.setHeader('*','__RequestAuthToken', this.getToken());
        this.Token = localStorage.getItem('Token') as string;
        this.api.setRequestTimeout(20.0)
      })

  }

 getjobListing(){
    return this.api.get(`${this.baseUrl}JobListing/GetJobPostingList`,{},{})
 }

 async dologin(user:{Email:string,Password:string}){

    return await this.api.post(`${this.baseUrl}Account/Login`,user,{})

  }

  getUserRole() {
    return localStorage.getItem(String(this.RoleId));
  }

  setUserRole(role: string) {
    localStorage.setItem(String(this.RoleId),role);
  }
  getToken(): string {
    if(localStorage.getItem('Token')!=''){
      this.Token=localStorage.getItem('Token') as string
    }
    return this.Token;
  }

  setUsername(token: string): void {
    this.UserName = token;

  }
  getUsername(): string {
    return localStorage.getItem('username')as string;
  }

  setToken(token: string): void {
    this.Token = token;
    localStorage.setItem('Token', token);
  }

  getApplicantsData(PageNumber:number,statusId?:number,PageSize:number=5,IsAscending:boolean=true,OrderByColumn='FirstName'){

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
  getActionList(PageNumber:number,statusId?:number,StartDate?:string,EndDate?:string,PageSize:number=5){
this.api.setHeader('*','__RequestAuthToken', this.Token);
    const g={
      'CurrentPageNumber':PageNumber,
      'PageSize':PageSize,
    }
    console.log(g,statusId,StartDate,EndDate)
    return this.api.post(this.baseUrl+'AdvancedSearch/AdvancedActionSearch?StatusId='+statusId+'&StartDate='+StartDate+'&EndDate='+EndDate,g,{})

  }

  uploadFile(formdata:any=''){
    this.api.setDataSerializer('multipart');
    return this.api.post(this.baseUrl+'Upload/UploadFile?databaseName=ATS',formdata,{})
  }
  createApplicant(g:Applicant, ogFile:string){
    this.api.setDataSerializer('json');
    this.api.post(this.baseUrl+'Registrations/Register',g,{}).then(
      res=>{
        console.log('create:-',res)
        this.api.setDataSerializer('json');
        this.list=JSON.parse(res.data)
        this.UploadApplicantId=this.list['Result']
        const g={
          FileName:this.FileName,
          FilePath:this.FilePath,
          OriginalFileName:ogFile
        }
        this.api.post(this.baseUrl+'Registrations/FileUpload?ApplicantId='+this.UploadApplicantId+'&databaseName=ATS',g,{}).then(
          response=>{
            console.log('Database Res:-',response)
            this.router.navigateByUrl('/menu/applicant-list-page')
          }

        ).catch( error=>
          {
            if(this.handleSessionTimeout(error)){
              console.log('Database:-',error)
            }
        });
      }
    ).catch(error=>{
      if( this.handleSessionTimeout(error)){
        console.log('CreateError:- ',error)
        this.showAlertF();

      }
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
      header: 'Error!',
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
  async loginFailed() {
    const alert = await this.alertController.create({
      header: 'Login Failed ',
      message:'Invaild Email or Password ',
      buttons: ['OK']
    });
     await alert.present();
  }
  async sessionTimeOut() {
    const alert = await this.alertController.create({
      header: 'Session TimeOut ',
      message:'Please Login Again',
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
      "Mode":gg.ModeofInterView,
      "ActionId": ActionId,
      "PositionId":gg.PositionId,
      "CompanyId":gg.CompanyId,
      "Venue":gg.Venue
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

  upDateReason(actionID:number,resonId:number,reason:string){
    const g={
      "ReasonId":resonId,
      "Reason":reason
    }
    return this.api.post(this.baseUrl+'Schedules/UpdateReason?ActionId='+actionID,g,{})
  }


  onHoldStatus(actionID:number,desc:string){
    const body={
      "Description":desc
    }
    console.log(body)
    return this.api.post(this.baseUrl+'Schedules/Comment?ActionId='+actionID,body,{})
  }

  async downloadFile(filename: string, filePath: string): Promise<void> {
   return await this.api.downloadFile(this.baseUrldownload+filename, {}, {}, filePath);
    }


    getEventDetails(){
      this.api.setHeader('*','__RequestAuthToken', this.Token);
      return this.api.get(this.baseUrl+'Dashboard/GetEvents',{},{});
    }

    getApplicantHistory(appid:number){
      this.api.setHeader('*','__RequestAuthToken', this.Token);
      const payload={
        "ApplicantId":appid
      }
      console.log(this.Token)
      return this.api.get(`${this.baseUrl}AdvancedSearch/ApplicantTimeline_APP`,payload,{});
    }

    getCompanyList(applicntId:number){

      return this.api.get(`${this.baseUrl}Schedules/GetCompanyDetails/?ApplicantId=${applicntId}`,{},{})
    }
    getPosition(){
      return this.api.get(`${this.baseUrl}Schedules/GetPositionDetails`,{},{})
    }

    handleMessageType(response:any){
      if(response['MessageType']===1){
        return true
      }
      else{
        return false
      }

    }

    handleSessionTimeout(error:any){
      debugger
      if(error.error!=undefined && error.status==401){
      let err=JSON.parse(error.error);
      if(err['MessageType']===0 ){
        localStorage.setItem('Token','')
        this.router.navigate(['/login'],{replaceUrl:true})
        localStorage.setItem('isLogedIn','');
        this.sessionTimeOut();
        return false
      }
    }
      return true
    }


    encyptData(data:string){
      const key = CryptoJS.enc.Utf8.parse('acg7ay8h447825cg');
      const iv = CryptoJS.enc.Utf8.parse('8080808080808080');
      const encryptedData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
      console.log(encryptedData)
      return encodeURIComponent(encryptedData)

    }
    decyptData(data:string){
      data=decodeURIComponent(data);
      const key = CryptoJS.enc.Utf8.parse('acg7ay8h447825cg');
      const iv = CryptoJS.enc.Utf8.parse('8080808080808080');
      const decryptedData = CryptoJS.AES.decrypt(data, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
      console.log(decryptedData)
      return decryptedData

    }
  }


