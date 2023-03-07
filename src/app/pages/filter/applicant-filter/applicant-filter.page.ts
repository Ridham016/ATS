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
  list:any;

  currList:any=[]
  preeList:any=[] 
  label=Constant;

  CurrentLoaction=this.label.StoredCurrentLocation;
  PreferedLoaction=this.label.StoredPreferedLocation;

  constructor(
    public modalCtrl: ModalController,
    private api:ApiService ,
     private plt:Platform,

     ) {
      this.api.Activelist=this.api.CopyActivelist
      this.selectedCurrentLoaction=this.CurrentLoaction;
      this.selectedPreferedLoaction=this.PreferedLoaction;
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
      this.currList.push(this.list[i]['CurrentLocation'])}
      if(!this.preeList.includes(this.list[i]['PreferedLocation'])){
      this.preeList.push(this.list[i]['PreferedLocation'])
      console.log(this.preeList)
      }
  }
  }

  clearFilters(){
    this.label.StoredCurrentLocation='';
    this.label.StoredPreferedLocation='';
   this.modalCtrl.dismiss();
  }

  async applyFilters(){
    const searchTerm =[this.selectedCurrentLoaction,this.selectedPreferedLoaction];
  let searchSource:any[]=[];
  searchSource = this.api.Activelist.filter((d:any) => d.CurrentLocation.toLowerCase().includes(searchTerm[0].toLowerCase()) && d.PreferedLocation.toLowerCase().includes(searchTerm[1].toLowerCase()));
  this.api.Activelist=searchSource;
  this.label.StoredCurrentLocation=this.selectedCurrentLoaction;
  this.label.StoredPreferedLocation=this.selectedPreferedLoaction;
    await this.modalCtrl.dismiss();
  }

}
