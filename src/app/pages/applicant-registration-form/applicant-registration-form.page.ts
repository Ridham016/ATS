import { Component, OnInit, ViewChild } from '@angular/core';
import { Applicant, ApplicantDetails } from 'src/app/Model/applicant-details';
import { ApiService } from 'src/app/services/api.service';
import { SwiperSlideDirective, SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-applicant-registration-form',
  templateUrl: './applicant-registration-form.page.html',
  styleUrls: ['./applicant-registration-form.page.scss'],
})
export class ApplicantRegistrationFormPage implements OnInit {
@ViewChild(SwiperComponent) swiper!:SwiperComponent;
  constructor(private a:ApiService) {
  }

  ngOnInit() {
  }

list:any;
  details=new Applicant()

  onButtonClick(swiperINdex:number){
    this.swiper.swiperRef.slideTo(swiperINdex);
    this.a.getApplicantsData().then(gg=>{
      this.list=JSON.parse(gg.data)
      this.list=this.list['Result']
      console.log(this.list)

    });

  }
  onUpdate(id:number){
    this.details['ApplicantId']=id
    this.a.updateApplicant(this.details,id);
  }
  onCreate(){
   console.log(this.details)

   this.a.createApplicant(this.details)
  }
}
