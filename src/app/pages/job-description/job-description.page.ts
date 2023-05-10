import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import{StatusBar} from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.page.html',
  styleUrls: ['./job-description.page.scss'],
})
export class JobDescriptionPage implements OnInit {
  jddata : any[] = [];
  postingId =this.activatedRoute.snapshot.queryParams['id'];
  constructor(
    private api:ApiService,
    private activatedRoute: ActivatedRoute,
    private status:StatusBar
     ) { }

  ngOnInit() {
    this.getJobDescriptionData();
    this.status.backgroundColorByName('white');
  }



  getJobDescriptionData(){
    console.log(this.postingId)
    let jd = [];
    this.api.getJobDescription(this.postingId ).then((data)=>{
      console.log(data);
      jd = JSON.parse(data.data);
      jd = jd['Result'];
      console.log(jd);
      this.jddata = jd;

    }).catch((err)=>{
      console.log(err);
      this.api.showAlertF();
    })
  }

  }


