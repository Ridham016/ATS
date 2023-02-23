import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ApiService } from 'src/app/services/api.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-applicant-list-page',
  templateUrl: './applicant-list-page.page.html',
  styleUrls: ['./applicant-list-page.page.scss'],
})
export class ApplicantListPagePage implements OnInit {

  list:any;

  constructor(private api:ApiService , private plt:Platform) {

   }

  async ngOnInit() {
    this.plt.ready().then(_=>{
      this.onLoadData();
    })

  }

  onLoadData(){
    this.api.getApplicantsData().then(gg=>{
      this.list=JSON.parse(gg.data)
      this.list=this.list['Result']
      console.log(this.list)

    });
  }
}
