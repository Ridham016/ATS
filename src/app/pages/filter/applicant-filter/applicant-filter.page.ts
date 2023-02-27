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
  currList:any=[];

  constructor(
    public modalCtrl: ModalController,
    private api:ApiService ,
     private plt:Platform,

     ) { }

  ngOnInit() {
    this.plt.ready().then(_=>{
      this.onLoadData();
    })
  }

  onLoadData(){
    this.api.showLoader()
    this.api.getApplicantsData().then(gg=>{
      console.log(gg)
      this.list=JSON.parse(gg.data)
      this.list=this.list['Result']

      for (let i = 0; i < this.list.length; i++) {
        if(!this.currList.includes(this.list[i]['CurrentLocation'])){
        this.currList.push(this.list[i]['CurrentLocation'])
      console.log(this.currList)
      }
    }
      this.api.hideLoader();
    });
  }

  clearFilters(){

  }

  applyFilters(){

  }

  async dismiss(){
    await this.modalCtrl.dismiss();
  }
}
