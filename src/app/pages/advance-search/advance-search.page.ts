import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Platform, MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Constant } from 'src/app/constant';
import { AdvanceSearchFilterPage } from '../filter/advance-search-filter/advance-search-filter.page';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.page.html',
  styleUrls: ['./advance-search.page.scss'],
})
export class AdvanceSearchPage implements OnInit{




  @ViewChild('swiper') swiper: any;



list:any[]=[];
slides: any[][] = [];
pageNumber = 1;
myCustomIcon = "/assets/view-details-icon.svg";
lable=Constant;
totalRecord:any=1;
loaded=false;

constructor(public api:ApiService ,
   private plt:Platform,
   public modalController: ModalController,
   private router:Router,
   private menuController:MenuController
    ) {

 }

 ionViewWillEnter() {

  this.menuController.enable(true,'gg');
  console.log("fired");
  this.menuController.close();
}

ionViewWillLeave() {
  this.menuController.enable(false,'gg');
  console.log("fired1");
  this.menuController.close();
}

async ngOnInit() {
  this.plt.ready().then(_=>{
    this.onLoadData();
  })
}

async openSearchFilter() {
  this.loaded=false
  const modal = await this.modalController.create({
    component: AdvanceSearchFilterPage,
    componentProps: { }
  });

  modal.onDidDismiss().then(data=>{
    let ApiList=[];
    let page=1;
    this.pageNumber=page;
    console.log(this.api.UploadStatusId)

    this.api.getActionList(page,this.api.UploadStatusId,this.api.StartDate,this.api.EndDate).then(gg=>{
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
      if( this.api.handleSessionTimeout(error)){
        console.log(error)
        this.api.showAlertF();
        this.loaded=true
        this.totalRecord=1
      }
    });

  })

  await modal.present();

}
handleRefresh(event:any) {
  setTimeout(() => {
    this.list=[]
    this.loaded=false
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
    this.swiper.swiperRef.slideNext();
    this.pageNumber=this.totalRecord;
    this.loaded=false
    this.onNextPageLoad(this.pageNumber)
  }
}


onNextPageLoad(page:number){
  let ApiList=[];
  this.api.getActionList(page,this.api.UploadStatusId,this.api.StartDate,this.api.EndDate).then(gg=>{
    console.log(gg)
    ApiList=JSON.parse(gg.data)
    ApiList=ApiList['Result']
    console.log(ApiList)
    this.list=ApiList
    this.api.Activelist=this.list;
    this.loaded=true

  }).catch(error=>{
    if( this.api.handleSessionTimeout(error)){
      console.log(error)
      this.api.hideLoader();
      this.api.showAlertF();
    }
  });

}


onLoadData(event?: any){
  let ApiList=[];
  this.api.getActionList(this.pageNumber).then(gg=>{
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
      this.loaded=false;
      this.totalRecord=1
      this.api.showAlertF();
    }
  });

}

navigate(Applicantid:number){
  this.router.navigate(['menu/action-history'], {
    queryParams: {
      id:Applicantid
    }
  })}



}
