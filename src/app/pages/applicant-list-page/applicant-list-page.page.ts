
import { Router } from '@angular/router';
import { ApplicantFilterPage } from './../filter/applicant-filter/applicant-filter.page';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('swiper') swiper: any;



  list:any[]=[];
  slides: any[][] = [];
  pageNumber = 1;
  myCustomIcon = "/assets/view-details-icon.svg";
  lable=Constant;
  totalRecord:any=1;

  constructor(public api:ApiService ,
     private plt:Platform,
     public modalController: ModalController,
     private router:Router
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
      let ApiList=[];
      let page=1;
      this.pageNumber=page;
      this.api.showLoader()
      console.log(this.api.UploadStatusId)
      this.api.getApplicantsData(page,this.api.UploadStatusId).then(gg=>{
        console.log(gg)
        ApiList=JSON.parse(gg.data)
        ApiList=ApiList['Result']
        console.log(ApiList)
        this.list=ApiList
        this.totalRecord=Math.ceil(this.list[0]['TotalRecords']/4);
        console.log(this.totalRecord)
        this.api.Activelist=this.list;
        this.api.hideLoader();

      }).catch(error=>{
        console.log(error)
        this.api.hideLoader();
        this.api.showAlertF();
      });

    })

    await modal.present();

  }
  handleRefresh(event:any) {
    setTimeout(() => {
      this.list=[]
      this.pageNumber=1;
      this.lable.StoredStatus='';
      this.api.UploadStatusId=undefined;
      this.onLoadData();
      event.target.complete();
    }, 2000);
  }
  back() {
    if (this.swiper) {
      this.swiper.swiperRef.slidePrev();
      this.pageNumber--;
      this.onNextPageLoad(this.pageNumber)
    }
  }

  // function to go to the next slide
  next() {
    if (this.swiper) {
      this.swiper.swiperRef.slideNext();
      this.pageNumber++;
      this.onNextPageLoad(this.pageNumber)
    }
  }

  goToFirstPage(){
    if (this.swiper) {
      this.swiper.swiperRef.slideNext();
      this.pageNumber=1;
      this.onNextPageLoad(this.pageNumber)
    }
  }

  goToLastPage(){
    if (this.swiper) {
      this.swiper.swiperRef.slideNext();
      this.pageNumber=this.totalRecord;
      this.onNextPageLoad(this.pageNumber)
    }
  }


  onNextPageLoad(page:number){
    let ApiList=[];
    this.api.showLoader()
    this.api.getApplicantsData(page,this.api.UploadStatusId).then(gg=>{
      console.log(gg)
      ApiList=JSON.parse(gg.data)
      ApiList=ApiList['Result']
      console.log(ApiList)
      this.list=ApiList
      this.api.Activelist=this.list;
      this.api.hideLoader();

    }).catch(error=>{
      console.log(error)
      this.api.hideLoader();
      this.api.showAlertF();
    });

  }


  onLoadData(event?: any){
    let ApiList=[];
    this.api.showLoader()
    this.api.getApplicantsData(this.pageNumber).then(gg=>{
      console.log(gg)
      ApiList=JSON.parse(gg.data)
      ApiList=ApiList['Result']
      console.log(ApiList)
      this.list=ApiList;
      this.api.Activelist=this.list;
      this.totalRecord=Math.ceil(this.list[0]['TotalRecords']/4);
      this.api.hideLoader();


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

