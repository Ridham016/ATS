import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import{MenuController} from '@ionic/angular'
@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.page.html',
  styleUrls: ['./job-posting.page.scss'],
})
export class JobPostingPage implements OnInit {
  joblist : any[] = [];
  constructor(private api: ApiService, private menuController: MenuController) { }

  ngOnInit() {
    this.jobListingData();
  }


  ionViewWillEnter() {

    this.api.hideLoader();
    this.menuController.enable(true,'gg');
    console.log("fired")

  }

  ionViewWillLeave() {
    this.menuController.enable(false,'gg');
    console.log("fired1");
    this.menuController.close();
  }

  jobListingData(){
      let Apilist = [];
      this.api.getjobListing().then(list =>{
        console.log(list)
        Apilist = JSON.parse(list.data)
        Apilist = Apilist['Result']
        console.log(Apilist)
        this.joblist = Apilist
      })
  }
}
