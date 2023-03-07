
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

  //*Local Variales
  ApplicantId!:number;
  data:any=[];
  lable=Constant;


  constructor(
    private activatedRoute: ActivatedRoute,
    private api:ApiService,
    private router:Router,
  ) { }

  ngOnInit() {
    //*Gettig id Passed through Param
    this.ApplicantId=this.activatedRoute.snapshot.queryParams['id'];

    //*Callig api Service getApplicat method to fetch Single user Data & populate data variale
    this.api.getApplicant(this.ApplicantId).then(response=>{
        console.log(response)
        this.data=JSON.parse(response.data)

        //*Storing response data into Local Variable data
        this.data=this.data.Result;
    })
  }

  onClick(){
    //*Navigate to schedulling Page
    this.router.navigate(['scheduling-form'])
  }
}
