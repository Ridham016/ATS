import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Applicant, ApplicantDetails } from 'src/app/Model/applicant-details';
import { ApiService } from 'src/app/services/api.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-applicant-registration-form',
  templateUrl: './applicant-registration-form.page.html',
  styleUrls: ['./applicant-registration-form.page.scss'],
})
export class ApplicantRegistrationFormPage implements OnInit {
@ViewChild(SwiperComponent) swiper!:SwiperComponent;

currentDate = new Date().toISOString();
  constructor(private a:ApiService,
    private router:Router) {

  }

  ngOnInit() {
  }
date=new Date();
list:any;
progress=.33;
  details=new Applicant()

  onButtonClick(swiperINdex:number){
    this.swiper.swiperRef.slideTo(swiperINdex);


  }
  onUpdate(id:number){
    this.details['ApplicantId']=id
    this.a.updateApplicant(this.details,id);
  }
  onCreate(){
   console.log(this.details)

   this.a.createApplicant(this.details)
   this.router.navigate(['applicant-list-page']);
  }
}
