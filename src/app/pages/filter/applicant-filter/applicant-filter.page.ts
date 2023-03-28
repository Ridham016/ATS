import { Constant } from 'src/app/constant';
import { ApiService } from 'src/app/services/api.service';
import { ModalController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-filter',
  templateUrl: './applicant-filter.page.html',
  styleUrls: ['./applicant-filter.page.scss'],
})
export class ApplicantFilterPage implements OnInit {
  
  selectedStatus:any;
  list:any;
  currStatusList:any=[]
  label=Constant;

  CurrentStatus=this.label.StoredStatus;

  constructor(
    public modalCtrl: ModalController,
    private api:ApiService ,
     private plt:Platform,

     ) {
      this.selectedStatus=this.CurrentStatus;
      }

  ngOnInit() {
    this.plt.ready().then(_=>{
      this.list=this.api.Activelist;
    })
  }




  clearFilters(){

    this.label.StoredStatus='';
    this.api.UploadStatusId= undefined;
    this.modalCtrl.dismiss();

  }

  async applyFilters(){
  this.label.StoredStatus=this.selectedStatus;
  this.api.UploadStatusId=this.selectedStatus;
   await this.modalCtrl.dismiss();
  }

}
