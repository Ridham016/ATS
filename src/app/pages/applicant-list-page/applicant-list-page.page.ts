
import { Router } from '@angular/router';
import { ApplicantFilterPage } from './../filter/applicant-filter/applicant-filter.page';
import { Component, OnInit } from '@angular/core';
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
  slides: any[][] = [];
  pageNumber = 1;
  myCustomIcon = "/assets/view-details-icon.svg";
  lable=Constant;
  totalRecord:any;
  constructor(public api:ApiService ,
     private plt:Platform,
     public modalController: ModalController,
     private router:Router,
      ) {

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

    await modal.present();

  }
  handleRefresh(event:any) {
    setTimeout(() => {
      this.list=[]
      this.pageNumber=1;
      this.onLoadData()
      event.target.complete();
    }, 2000);
  };

  // onNextPageLoad(){
  //   let ApiList=[];
  //   this.api.showLoader()
  //   this.api.getApplicantsData(this.pageNumber).then(gg=>{
  //     console.log(gg)
  //     ApiList=JSON.parse(gg.data)
  //     ApiList=ApiList['Result']
  //     console.log(ApiList)
  //     this.list=ApiList

  //     this.api.Activelist=this.list;
  //     this.api.CopyActivelist=this.list;
  //     this.api.hideLoader();
  //     this.pageNumber++;

  //   }).catch(error=>{
  //     console.log(error)
  //     this.api.hideLoader();
  //     this.api.showAlertF();
  //   });

  // }

  // onLoadData(event?: any){
  //   let ApiList=[];
  //   this.api.showLoader()
  //   this.api.getApplicantsData(this.pageNumber).then(gg=>{
  //     console.log(gg)
  //     ApiList=JSON.parse(gg.data)
  //     ApiList=ApiList['Result']
  //     console.log(ApiList)
  //     this.list=ApiList
  //     this.api.Activelist=this.list;
  //     for (let i = 0; i < this.list.length; i += 8) {
  //       this.slides.push(this.list.slice(i, i + 8));
  //     }
  //     this.totalRecord=Math.round(this.list[0]['TotalRecords']/8)
  //     console.log(this.slides)
  //     this.api.CopyActivelist=this.list;
  //     this.api.hideLoader();
  //     this.pageNumber++;

  //   }).catch(error=>{
  //     console.log(error)
  //     this.api.hideLoader();
  //     this.api.showAlertF();
  //   });

  // }




  onLoadData(event?: any){
    let ApiList=[];
    // this.api.showLoader()
    this.api.getApplicantsData(this.pageNumber).then(gg=>{
      console.log(gg)
      if(event){
        event.target.complete();
      }
      ApiList=JSON.parse(gg.data)
      ApiList=ApiList['Result']
      console.log(ApiList)
      this.list=[...this.list,...ApiList]
      this.api.Activelist=this.list;
      this.api.CopyActivelist=this.list;
      this.api.hideLoader();
      this.pageNumber++;

      if(ApiList.length===0){
        event.target.disabled = true;
      }

    }).catch(error=>{
      console.log(error)
      this.api.hideLoader();
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

