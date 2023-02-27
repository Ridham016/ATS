import { ApplicantFilterPage } from './../filter/applicant-filter/applicant-filter.page';
import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ApiService } from 'src/app/services/api.service';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-applicant-list-page',
  templateUrl: './applicant-list-page.page.html',
  styleUrls: ['./applicant-list-page.page.scss'],
})
export class ApplicantListPagePage implements OnInit {

  list:any;

  constructor(public api:ApiService , private plt:Platform,public modalController: ModalController) {

   }
async ionViewWillEnter(){

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
      this.list=this.api.Activelist
    })
    
    await modal.present();

  }

  onLoadData(){
    this.api.showLoader()
    this.api.getApplicantsData().then(gg=>{
      if(gg){
      this.list=JSON.parse(gg.data)
      this.list=this.list['Result']
      this.api.Activelist=this.list;
      this.api.hideLoader();
    }}).catch(error=>{
      this.api.showAlertF();
    });

  }
}
