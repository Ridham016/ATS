import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import{MenuController} from '@ionic/angular'
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.page.html',
  styleUrls: ['./job-posting.page.scss'],
})
export class JobPostingPage implements OnInit {
  joblist : any[] = [];
  loaded = false;
  constructor(
    private api: ApiService,
    private menuController: MenuController,
    private router:Router

    ) { }

  ngOnInit() {
    this.jobListingData();
  }


  ionViewWillEnter() {

    this.api.hideLoader();
    this.menuController.enable(true,'gg');
    console.log("fired")
    this.loaded = false;

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
        this.joblist = Apilist;
        this.loaded =true;
      }).catch(error=>{
        if(this.api.handleSessionTimeout(error)){
          console.log('error')
          this.api.showAlertF();
          this.loaded = true;
        }
      })
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.joblist=[]
      this.loaded=false
      this.jobListingData();
      event.target.complete();
    }, 2000);
  }

  register(postingId:number){
    this.router.navigate(['/menu/applicant-registration-form'],
    {
      queryParams: {
        id:postingId,
      }
    }
    )
  }
}
