import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/constant';
import { Scheduling } from 'src/app/Model/applicant-details';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-scheduling-form',
  templateUrl: './scheduling-form.page.html',
  styleUrls: ['./scheduling-form.page.scss'],
})
export class SchedulingFormPage implements OnInit {
interviewerList:any =[];
statusID!: number;
ActionId! : number |any;
ApplicantId!: number;
LinkDisabled!:boolean

  constructor(private plt:Platform ,private api :ApiService,public router:Router,private activatedRoute:ActivatedRoute) { }
  labal=Constant;
  schedule = new Scheduling();

  currentDate = new Date().toISOString();
  ngOnInit( ) {
    this.ApplicantId = this.activatedRoute.snapshot.queryParams['id'];
    this.statusID = this.activatedRoute.snapshot.queryParams['nextStatus'];
    this.plt.ready().then(_=>{
        this.api.getInterviwer().then(res=>{
          this.interviewerList = JSON.parse (res.data)

          this.interviewerList=this.interviewerList['Result']
          console.log(this.interviewerList);
        })
    })
  }


  disableLink(event: any) {
    if (event.detail.value == "0") { // value of selected fresher option
      this.LinkDisabled = true;

    } else {
      console.log('triggered')
      this.LinkDisabled = false;
    }
  }

 async onScheduleCall(){
  console.log(this.schedule)

   await this.api.StatusUpdate(this.ApplicantId,this.statusID).then(res=>{
      console.log(res.data)
      this.ActionId = JSON.parse(res.data)
      this.ActionId = this.ActionId['Result']
      this.ActionId = this.ActionId[1]
      console.log(this.ActionId);
    if (res.status==200){

      this.api.scheduleMeeting(this.schedule,this.ActionId).then(res=>{
        console.log(res)
        if(res.status==200){
          this.router.navigateByUrl('/menu/user-dash-board');

        }
      })

    }


  })
}

}

