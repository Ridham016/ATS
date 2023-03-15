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
      this.api.Activelist=this.api.CopyActivelist
      this.selectedStatus=this.CurrentStatus;
      }

  ngOnInit() {
    this.plt.ready().then(_=>{

      this.list=this.api.Activelist;
      this.onLoadData();
    })
  }

  onLoadData(){

    for (let i = 0; i < this.list.length; i++) {
     if(!this.currStatusList.includes(this.list[i]['StatusName'])){
        this.currStatusList.push(this.list[i]['StatusName']);
      }
  }
  }

  clearFilters(){

    this.label.StoredStatus='';
    this.modalCtrl.dismiss();

  }

  async applyFilters(){
    const searchTerm =[this.selectedStatus];
  let searchSource:any[]=[];
  searchSource = this.api.Activelist.filter((d:any) => d.CurrentLocation.toLowerCase().includes(searchTerm[0].toLowerCase()));
  this.api.Activelist=searchSource;
  this.label.StoredStatus=this.selectedStatus;
   await this.modalCtrl.dismiss();
  }

}
