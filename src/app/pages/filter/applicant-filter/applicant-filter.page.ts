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
  CurrentLoaction:any;
  PreferedLoaction:any;
  list:any;
  currList:any=[];
  preeList:any=[];

  constructor(
    public modalCtrl: ModalController,
    private api:ApiService ,
     private plt:Platform,

     ) {
      this.selectedCurrentLoaction=this.CurrentLoaction;
      this.selectedPreferedLoaction=this.PreferedLoaction;
      }

  ngOnInit() {
    this.plt.ready().then(_=>{
      this.onLoadData();
    })
  }

  onLoadData(){
    // this.api.showLoader()
    // this.api.getApplicantsData().then(gg=>{
    //   console.log(gg)
    //   this.list=JSON.parse(gg.data)
    //   this.list=this.list['Result']
    //   this.api.Activelist=this.list
    //   console.log(this.api.Activelist)
    //   for (let i = 0; i < this.list.length; i++) {
    //     if(!this.currList.includes(this.list[i]['CurrentLocation'])){
    //     this.currList.push(this.list[i]['CurrentLocation'])}
    //     if(!this.preeList.includes(this.list[i]['PreferedLocation'])){
    //     this.preeList.push(this.list[i]['PreferedLocation'])
    //     console.log(this.preeList)
    //     }
    // }
    //   this.api.hideLoader();
    // });
  }

  clearFilters(){
    this.selectedCurrentLoaction='';
    this.selectedPreferedLoaction='';
   this.modalCtrl.dismiss();
  }

  async applyFilters(){
    const searchTerm =[this.selectedCurrentLoaction,this.selectedPreferedLoaction];
  let searchSource:any[]=[];
  searchSource = this.api.Activelist.filter((d:any) => d.CurrentLocation.toLowerCase().includes(searchTerm[0].toLowerCase()) && d.PreferedLocation.toLowerCase().includes(searchTerm[1].toLowerCase()));
  this.api.Activelist=searchSource;
  this.CurrentLoaction=this.selectedCurrentLoaction;
  this.PreferedLoaction=this.selectedPreferedLoaction;
    await this.modalCtrl.dismiss();
  }

}
