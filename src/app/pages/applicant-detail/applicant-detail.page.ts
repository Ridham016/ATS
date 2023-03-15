import { AlertController } from '@ionic/angular';
import { Constant } from './../../constant';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.page.html',
  styleUrls: ['./applicant-detail.page.scss'],
})
export class ApplicantDetailPage implements OnInit {

  //*Local Variales
  ApplicantId!:number;
  data:any=[];
  ActionId! : number |any;
  but_data:any=[];
  reasonList:any=[];
  lable=Constant;
  StatusId=0;
  selectedvalue:any;

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
      }).then(_=>{
        this.api.getOtherReasons().then(res=>{
        this.reasonList=JSON.parse(res.data)
        this.reasonList=this.reasonList['Result']

        console.log(this.reasonList)

      })})

  }
  async onStatusUpdate(currStatusId:number,nextStatusId:number){
    //*Navigate to schedulling Page
    if(currStatusId==3){
    this.router.navigate(['scheduling-form'],
    {
      queryParams: {
        id:this.ApplicantId,
        nextStatus: nextStatusId
      }
    }
    )
  }
  else if(currStatusId==7){
    const alert = await this.alertCtrl.create({
      header: 'Select an option',
      message: 'Choose an option from the dropdown',
      inputs: this.reasonList.map((val:any) => {

        return {
          type: 'radio',
          label: val.Reason,
          value: val.ReasonId
        }
      }),

      buttons: [
        {
          text: 'Submit',
          handler: (alert) => {
           console.log('Selected value:', alert);
          this.api.StatusUpdate(this.ApplicantId,nextStatusId).then(async (res)=>{
              console.log(res.data)
              this.ActionId = JSON.parse(res.data)
              this.ActionId = this.ActionId['Result']
              this.ActionId = this.ActionId[1]
              console.log(this.ActionId);

          }).then(_=>{
            console.log(this.ActionId,alert)
            this.api.upDateReason(this.ActionId,alert).then(res=>{
              if(res.status==200){
                this.router.navigate(['applicant-list-page']).then(() => {
                  window.location.reload();;
                })
              }
            })

          })
          }
        }
      ]
    });
    await alert.present();
  }

  else if(currStatusId==4){
    const alert = await this.alertCtrl.create({
      header: 'Select an option',
      message: 'Choose an option from the dropdown',
      inputs:[
        {
          name: 'text',
          type: 'textarea',
          placeholder: 'Enter text here...'
        }
      ],

      buttons: [ {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      },
        {
          text: 'Submit',
          handler: (alert) => {
           console.log('Selected value:', alert.text);
          this.api.StatusUpdate(this.ApplicantId,nextStatusId).then(async (res)=>{
              console.log(res.data)
              this.ActionId = JSON.parse(res.data)
              this.ActionId = this.ActionId['Result']
              this.ActionId = this.ActionId[1]
              console.log(this.ActionId);

          }).then(_=>{
            console.log(this.ActionId,alert.text)
            this.api.onHoldStatus(this.ActionId,alert.text).then(res=>{
              console.log(res)
              if(res.status==200){
                this.router.navigate(['applicant-list-page']).then(() => {
                  window.location.reload();
                })
              }
            })

          })
          }
        }
      ]
    });
    await alert.present();
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
