
import { Constant } from './../../constant';
import { Applicant } from 'src/app/Model/applicant-details';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.page.html',
  styleUrls: ['./applicant-detail.page.scss'],
})
export class ApplicantDetailPage implements OnInit {

  ApplicantId!:number;
  data:any=[];
  lable=Constant;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api:ApiService,
    private router:Router,

  ) { }

  ngOnInit() {
    this.ApplicantId=this.activatedRoute.snapshot.queryParams['id'];

    this.api.getApplicant(this.ApplicantId).then(response=>{
        console.log(response)
        this.data=JSON.parse(response.data)
        this.data=this.data.Result;
        console.log(this.data)
    })
  }

  onClick(id:number){
    this.router.navigate(['scheduling-form'])
  }
}
