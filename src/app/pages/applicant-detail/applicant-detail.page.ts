import { AlertController } from '@ionic/angular';

import { Constant } from './../../constant';
import { Applicant } from 'src/app/Model/applicant-details';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomAlertService } from 'src/app/services/custom-alert.service';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.page.html',
  styleUrls: ['./applicant-detail.page.scss'],
})
export class ApplicantDetailPage implements OnInit {

  //*Local Variales
  ApplicantId!:number;
  data:any=[];
  but_data:any=[];
  lable=Constant;
  StatusId=0;
  color='red';

  constructor(
    private activatedRoute: ActivatedRoute,
    private api:ApiService,
    public alertCtrl:AlertController,
    private router:Router,
  ) { }

 async ngOnInit() {
    //*Gettig id Passed through Param
    this.ApplicantId=this.activatedRoute.snapshot.queryParams['id'];
    //*Callig api Service getApplicat method to fetch Single user Data & populate data variale
   await this.api.getApplicant(this.ApplicantId).then(response=>{
        console.log(response)
        this.data=JSON.parse(response.data)

        //*Storing response data into Local Variable data

        this.data=this.data.Result;
        this.StatusId=this.data['StatusId'];
        this.api.getActiveActionButton(this.StatusId).then(but_response=>{
          this.but_data=JSON.parse(but_response.data)
          this.but_data=this.but_data.Result
          console.log(this.but_data)
        })
      })

  }
  async onStatusUpdate(currStatusId:number,nextStatusId:number){
    //*Navigate to schedulling Page
    if(currStatusId==3){
    this.router.navigate(['scheduling-form'])
  }
  else{
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.api.StatusUpdate(this.ApplicantId,nextStatusId).then(res=>{
              if(res.status==200){
                this.router.navigate(['applicant-list-page']).then(() => {
                  window.location.reload();;
                })
              }
            })
          }
          }
      ]
    });
    await alert.present();
  }

  }
}
