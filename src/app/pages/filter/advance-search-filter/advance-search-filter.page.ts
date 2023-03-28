import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/constant';
import { ModalController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-advance-search-filter',
  templateUrl: './advance-search-filter.page.html',
  styleUrls: ['./advance-search-filter.page.scss'],
})
export class AdvanceSearchFilterPage implements OnInit {

  selectedStatus:any;
  selectedStartDate :any;
  selectedEndDate :any;
  list:any;
  label = Constant;

  CurrentStatus=this.label.StoredStatus;
  StartDate=this.label.StoredStartDate;
  EndDate=this.label.StoredEndDate;


  constructor(  public modalCtrl: ModalController,
    private api:ApiService ,
     private plt:Platform, ) {

      this.selectedStatus=this.CurrentStatus;
      this.selectedStartDate = this.StartDate;
      this.selectedEndDate = this.EndDate;

      }

  ngOnInit() {
    this.plt.ready().then(_=>{
      this.list=this.api.Activelist;
    })
  }


  clearFilters(){

    this.label.StoredStatus='';
    this.label.StoredStartDate='';
    this.label.StoredEndDate='';
    this.api.UploadStatusId= undefined;
    this.modalCtrl.dismiss();
  }

  async applyFilters(){
    this.label.StoredStatus=this.selectedStatus;
    this.label.StoredStartDate=this.selectedStartDate;
    this.label.StoredEndDate=this.selectedEndDate;
    this.api.UploadStatusId=this.selectedStatus;
     await this.modalCtrl.dismiss();
    }

}
