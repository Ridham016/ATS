
import { Router } from '@angular/router';
import { ApplicantFilterPage } from './../filter/applicant-filter/applicant-filter.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Platform } from '@ionic/angular';
import { ModalController,MenuController } from '@ionic/angular';
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
  loaded=false;
  searchvalue:any=undefined;

  constructor(public api:ApiService ,
     private plt:Platform,
     public modalController: ModalController,
     private router:Router,
     private menuController:MenuController
      ) {

   }

   async ionViewDidEnter() {

   await this.menuController.enable(true,'gg');
    console.log("fired");
  }

  async ionViewWillLeave() {
    await this.menuController.enable(false,'gg');
    console.log("fired1");
    this.menuController.close();
  }
  ngOnInit() {
    this.plt.ready().then(_=>{
      this.onLoadData();
    })
  }

  async openSearchFilter() {
    this.loaded=false
    const modal = await this.modalController.create({

      component: ApplicantFilterPage,
      componentProps: { }
    });

    modal.onDidDismiss().then(data=>{
      let ApiList=[];
      let page=1;
      this.pageNumber=page;
      console.log(this.api.UploadStatusId)
      this.api.getApplicantsData(page,this.searchvalue,this.api.UploadStatusId,this.api.CompanyId,this.api.PositionId).then(gg=>{
        console.log(gg)
        ApiList=JSON.parse(gg.data)
        ApiList=ApiList['Result']
        console.log(ApiList)
        this.list=ApiList
        this.totalRecord=Math.ceil(this.list[0]['TotalRecords']/5);
        console.log(this.totalRecord)
        this.api.Activelist=this.list;
        this.loaded=true

      }).catch(error=>{
        debugger
        if( this.api.handleSessionTimeout(error)){
          console.log(error)
          this.api.hideLoader();
          this.api.showAlertF();
          this.loaded=true
          this.totalRecord=1
        }
      });

    })

    await modal.present();

  }
  handlesearch(event:any){
    console.log(event.target.value)
    this.pageNumber=1;
    this.searchvalue=event.target.value;
    this.onLoadData();

  }
  handleRefresh(event:any) {
    setTimeout(() => {
      this.list=[]
      this.loaded=false
      this.pageNumber=1;
      this.lable.StoredStatus='';
      this.api.UploadStatusId=undefined;
      this.api.CompanyId = undefined;
      this.api.PositionId = undefined;
      this.searchvalue='';
      this.onLoadData();
      event.target.complete();
    }, 2000);
  }
  back() {
    if (this.swiper) {
      this.swiper.swiperRef.slidePrev();
      this.pageNumber--;
      this.loaded=false
      this.onNextPageLoad(this.pageNumber)
    }
  }

  // function to go to the next slide
  next() {
    if (this.swiper) {
      this.swiper.swiperRef.slideNext();
      this.pageNumber++;
      this.loaded=false
      this.onNextPageLoad(this.pageNumber)
    }
  }

  goToFirstPage(){
    if (this.swiper) {
      this.swiper.swiperRef.slideNext();
      this.pageNumber=1;
      this.loaded=false
      this.onNextPageLoad(this.pageNumber)
    }
  }

  goToLastPage(){
    if (this.swiper) {
      this.loaded=false
      this.swiper.swiperRef.slideNext();
      this.pageNumber=this.totalRecord;
      this.onNextPageLoad(this.pageNumber)
    }
  }


  onNextPageLoad(page:number){
    let ApiList=[];
    this.api.getApplicantsData(page,this.searchvalue,this.api.UploadStatusId,this.api.CompanyId,this.api.PositionId).then(gg=>{
      console.log(gg)
      ApiList=JSON.parse(gg.data)
      ApiList=ApiList['Result']
      console.log(ApiList)
      this.list=ApiList
      this.api.Activelist=this.list;
      this.loaded=true;
    }).catch(error=>{
      if( this.api.handleSessionTimeout(error)){
        console.log(error)
        this.api.showAlertF();
      }
    })

  }


  onLoadData(event?: any){
    let ApiList=[];
    this.api.getApplicantsData(this.pageNumber,this.searchvalue,this.api.UploadStatusId,this.api.CompanyId,this.api.PositionId).then(gg=>{
      console.log(gg)
      ApiList=JSON.parse(gg.data)
      ApiList=ApiList['Result']
      console.log(ApiList)
      this.list=ApiList;
      this.api.Activelist=this.list;
      this.totalRecord=Math.ceil(this.list[0]['TotalRecords']/5);
      this.loaded=true;


    }).catch(error=>{
      if( this.api.handleSessionTimeout(error)){
        console.log(error)
        this.api.hideLoader();
        this.api.showAlertF();
      }
    });

  }

  navigate(Applicantid:number){
    this.router.navigate(['/menu/applicant-detail'], {
      queryParams: {
        id:Applicantid
      }
    })}
  }

