import { MenuController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Applicant, ApplicantDetails } from 'src/app/Model/applicant-details';
import { ApiService } from 'src/app/services/api.service';
import { SwiperComponent } from 'swiper/angular';
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
currentDate1 = new Date();
currentDate! : string;
date=new Date().toISOString();
selectedStatus!:number;
ApplicantStatus = [
  { value: 1, label: 'Fresher' },
  { value: 0, label: 'Experienced' }
];



selectedFileUrl: string = '';
  currentCompanyDisabled!: boolean;
  inputs:any[]=[];
  ogFile:any;
  link:any []=[];
  public i=0;
  PostingId: number;

  constructor(private a:ApiService,
    private menuController:MenuController,
    private activatedRoute:ActivatedRoute
    ) {
      this.PostingId = this.activatedRoute.snapshot.queryParams['id'];
  }
  addInput() {
    let i=1;
    this.inputs.push(i++);
    console.log(this.link);
    this.i++;
  }

  disableCurrentCompany(event: any) {
    console.log(this.selectedStatus)
    if (event.detail.value == "1") { // value of selected fresher option
      this.currentCompanyDisabled = true;
      this.swiper.swiperRef.slideTo(2);

    } else {
      console.log('triggered')
      this.currentCompanyDisabled = false;
    }
  }

  ionViewWillEnter() {
    this.menuController.enable(true,'gg');
    console.log("fired");
    this.menuController.close();
  }

  ionViewWillLeave() {
    this.menuController.enable(false,'gg');
    console.log("fired1");
    this.menuController.close();
  }
  ngOnInit() {
     this.currentDate1.setFullYear(this.currentDate1.getFullYear() - 18);
     this.currentDate = this.currentDate1.toISOString()
  }

  list:any;
  progress=.33;
  details=new Applicant()

  async onFileChange(event:any){
    debugger
    console.log(this.link);
    console.log(event)
    this.file=event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    let formData =new FormData();
    let name='document'
    formData.append('file',this.file);

    reader.onload = () => {
    this.selectedFileUrl = reader.result as string;

  }
  if(reader){
  this.a.showLoader();
    await this.a.uploadFile(formData).then(
      Upload_res=>{
        this.list=JSON.parse(Upload_res.data)
        console.log(this.list)
        this.list=this.list['Result']
        this.a.hideLoader();
        console.log(this.list)
        this.a.FilePath=this.list.FilePath;
        this.a.FileName=this.list.FileName;
        this.ogFile=this.list.OriginalFileName;
      }
  ).catch(error=>{
    this.a.showAlertdownloadF();
       console.log('Upload Error:- ',error)
       this.a.handleSessionTimeout(error);
  });
  }}
  onButtonClick(swiperINdex:number){

    this.swiper.swiperRef.slideTo(swiperINdex);
  }

  prev(swiperIndex :number){
    console.log(this.selectedStatus)
    this.swiper.swiperRef.slideTo(swiperIndex);
  }

  upload(file:File){
    console.log(file)

  }

  onCreate(){
    this.details.PortfolioLink=this.link[0];
    if(this.link[1])
    {
    this.details.LinkInLink=this.link[1];
    this.details.OtherLink=this.link[2];

    }
    this.details.PostingId=this.PostingId;
    console.log(this.details)
    this.a.createApplicant(this.details,this.ogFile)
    this.details=new Applicant();
  }

}
