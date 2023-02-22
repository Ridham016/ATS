import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperSlideDirective, SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-applicant-registration-form',
  templateUrl: './applicant-registration-form.page.html',
  styleUrls: ['./applicant-registration-form.page.scss'],
})
export class ApplicantRegistrationFormPage implements OnInit {
@ViewChild(SwiperComponent) swiper!:SwiperComponent;
  constructor() { }

  ngOnInit() {
  }


  details={
    Id:0,
    Name:'',
    Email:'',
    Mobile:'',
    Address:'',
    EntryPerson:'',
    EntryDate: new Date(),

  }

  onButtonClick(swiperINdex:number){
    this.swiper.swiperRef.slideTo(swiperINdex);
  }
}
