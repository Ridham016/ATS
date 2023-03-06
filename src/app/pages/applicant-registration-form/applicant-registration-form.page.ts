import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Applicant, ApplicantDetails } from 'src/app/Model/applicant-details';
import { ApiService } from 'src/app/services/api.service';
import { SwiperComponent } from 'swiper/angular';
import {SwiperOptions} from 'swiper';
import { Constant } from 'src/app/constant';



@Component({
  selector: 'app-applicant-registration-form',
  templateUrl: './applicant-registration-form.page.html',
  styleUrls: ['./applicant-registration-form.page.scss'],
})
export class ApplicantRegistrationFormPage implements OnInit {
@ViewChild(SwiperComponent) swiper!:SwiperComponent;

file!:File;
lable=Constant;
currentDate = new Date().toISOString();
date!:Date;
selectedFileUrl: string = '';

  constructor(private a:ApiService,
    private router:Router,

    ) {
  }

  ngOnInit() {
  }

  list:any;
  progress=.33;
  details=new Applicant()

  onFileChange(event:any){
    console.log(event)
    this.file=event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = () => {
    this.selectedFileUrl = reader.result as string;

  };

  }
  onButtonClick(swiperINdex:number){
    this.swiper.swiperRef.slideTo(swiperINdex);
  }

  prev(swiperIndex :number){
    this.swiper.swiperRef.slideTo(swiperIndex);
  }

  onUpdate(id:number){
    this.details['ApplicantId']=id
    this.a.updateApplicant(this.details,id);
  }
  upload(file:File){
    console.log(file)

  }

  onCreate(){
    let formData =new FormData();
    let name='document'
    formData.append('file',this.file);

    this.a.createApplicant(this.details,formData)
   this.router.navigate(['applicant-list-page']);
  }

}
