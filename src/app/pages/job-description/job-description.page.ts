import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.page.html',
  styleUrls: ['./job-description.page.scss'],
})
export class JobDescriptionPage implements OnInit {
  jddata : any=[];
  postingId =this.activatedRoute.snapshot.queryParams['id'];
  // postingId =2;
  constructor(
    private api:ApiService,
    private activatedRoute: ActivatedRoute,
    private router:Router
     ) { }

  ngOnInit() {
    this.getJobDescriptionData();
    // this.status.backgroundColorByName('white');
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

  register(postingId: number) {
    this.router.navigate(['/menu/applicant-registration-form'], {
      queryParams: {
        id: postingId,
      },
    });
  }

  }


