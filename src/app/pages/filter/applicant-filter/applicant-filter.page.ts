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
  selectedCurrentLoaction:any;
  selectedPreferedLoaction:any;
  selectedStatus:any;
  list:any;

  currList:any=[]
  preeList:any=[]
  currStatusList:any=[]
  label=Constant;

  CurrentLoaction=this.label.StoredCurrentLocation;
  PreferedLoaction=this.label.StoredPreferedLocation;
  CurrentStatus=this.label.StoredStatus;

  constructor(
    public modalCtrl: ModalController,
    private api:ApiService ,
     private plt:Platform,

     ) {
      this.api.Activelist=this.api.CopyActivelist
      this.selectedCurrentLoaction=this.CurrentLoaction;
      this.selectedPreferedLoaction=this.PreferedLoaction;
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
      if(!this.currList.includes(this.list[i]['CurrentLocation'])){
      this.currList.push(this.list[i]['CurrentLocation'])
    }
    if(!this.preeList.includes(this.list[i]['PreferedLocation'])){
      this.preeList.push(this.list[i]['PreferedLocation'])
      console.log(this.preeList)
      }
     if(!this.currStatusList.includes(this.list[i]['StatusName'])){
        this.currStatusList.push(this.list[i]['StatusName']);
      }
  }
  }

  clearFilters(){
    this.label.StoredCurrentLocation='';
    this.label.StoredPreferedLocation='';
    this.label.StoredStatus='';
    this.modalCtrl.dismiss();

  }

  async applyFilters(){
    const searchTerm =[this.selectedCurrentLoaction,this.selectedPreferedLoaction,this.selectedStatus];
  let searchSource:any[]=[];
  searchSource = this.api.Activelist.filter((d:any) => d.CurrentLocation.toLowerCase().includes(searchTerm[0].toLowerCase()) && d.PreferedLocation.toLowerCase().includes(searchTerm[1].toLowerCase()) && d.StatusName.toLowerCase().includes(searchTerm[2].toLowerCase()));
  this.api.Activelist=searchSource;
  this.label.StoredCurrentLocation=this.selectedCurrentLoaction;
  this.label.StoredStatus=this.selectedStatus;
  this.label.StoredPreferedLocation=this.selectedPreferedLoaction;
    await this.modalCtrl.dismiss();
  }

}
