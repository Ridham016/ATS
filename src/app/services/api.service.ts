import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http/ngx";
import { Applicant } from '../Model/applicant-details';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl='https://ba89-2402-3a80-e6a-1134-6408-b609-f897-c356.in.ngrok.io/api/';
  constructor(private api:HTTP) { }

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
}
