
import { Router } from '@angular/router';
import { ApplicantFilterPage } from './../filter/applicant-filter/applicant-filter.page';
import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ApiService } from 'src/app/services/api.service';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Constant } from 'src/app/constant';

@Component({
  selector: 'app-applicant-list-page',
  templateUrl: './applicant-list-page.page.html',
  styleUrls: ['./applicant-list-page.page.scss'],
})
export class ApplicantListPagePage implements OnInit {

  list:any[]=[];
  pageNumber = 1;
  myCustomIcon = "/assets/view-details-icon.svg";

  constructor(public api:ApiService ,
     private plt:Platform,
     public modalController: ModalController,
     private router:Router,
    

     ) {

   }
  async ionViewWillEnter(){

  }

  async ngOnInit() {
    this.plt.ready().then(_=>{
      this.onLoadData();
    })
  }

  async openSearchFilter() {
    const modal = await this.modalController.create({
      component: ApplicantFilterPage,
      componentProps: { }
    });

    modal.onDidDismiss().then(data=>{
      this.list=this.api.Activelist
    })
<<<<<<< Updated upstream

    await modal.present();
=======
>>>>>>> Stashed changes

    await modal.present();
  
  }

  onLoadData(event?: any){
    let ApiList=[];
    this.api.showLoader()
    this.api.getApplicantsData(this.pageNumber).then(gg=>{
      console.log(gg)
      if(event){
        event.target.complete();
      }
      ApiList=JSON.parse(gg.data)
      ApiList=ApiList['Result']
      this.list=[...this.list,...ApiList]
      this.api.Activelist=this.list;
      this.api.hideLoader();
      this.pageNumber++;
      console.log(ApiList.length)
      if(ApiList.length===0){
        event.target.disabled = true;
      }
    }).catch(error=>{
      this.api.showAlertF();
    });

  }



  navigate(Applicantid:number){
    this.router.navigate(['applicant-detail'], {
      queryParams: {
        id:Applicantid
      }
    })}
  }
