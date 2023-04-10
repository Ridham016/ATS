import { AlertController } from '@ionic/angular';
import { Constant } from './../../constant';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';


@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.page.html',
  styleUrls: ['./applicant-detail.page.scss'],
})
export class ApplicantDetailPage implements OnInit {

  //*Local Variales
  ApplicantId!:number;
  nextStatusId!:number;
  data:any=[];
  isModalVisibleHR = false;
  isModalVisibleother = false;
  isModalVisibleCI = false;
  ActionId! : number |any;
  but_data:any=[];
  reasonList:any=[];
  reasonDropDown!:number;
  reasonTextBox!:string;
  comment!:string;
  lable=Constant;
  StatusId=0;
  selectedvalue:any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private api:ApiService,
    public alertCtrl:AlertController,
    private router:Router,
    private file:File,
    private fileOpener: FileOpener
  ) {

  }

onCancleMeating(){
    console.log(this.reasonTextBox,this.reasonDropDown)
    this.api.StatusUpdate(this.ApplicantId,this.nextStatusId).then(async (res)=>{
                this.ActionId = JSON.parse(res.data)
                this.ActionId = this.ActionId['Result']
                this.ActionId = this.ActionId[1]
                console.log(this.ActionId);

            }).then(_=>{
              console.log(this.ActionId,)
              this.api.upDateReason(this.ActionId,this.reasonDropDown,this.reasonTextBox).then(res=>{
                if(res.status==200){
                  this.router.navigate(['/menu/applicant-list-page']).then(() => {
                    window.location.reload();;
                  })
                }
              })

            })
  }
  onHold(){
    console.log(this.reasonTextBox,this.reasonDropDown)
    this.api.StatusUpdate(this.ApplicantId,this.nextStatusId).then(async (res)=>{
                this.ActionId = JSON.parse(res.data)
                this.ActionId = this.ActionId['Result']
                this.ActionId = this.ActionId[1]
                console.log(this.ActionId);

            }).then(_=>{
              console.log(this.ActionId,)
              this.api.onHoldStatus(this.ActionId,this.reasonTextBox).then(res=>{
                if(res.status==200){
                  this.router.navigate(['/menu/applicant-list-page']).then(() => {
                    window.location.reload();;
                  })
                }
              })

            })
  }
  onDismiss(){
    this.isModalVisibleCI = false;
    this.isModalVisibleHR = false;
    this.isModalVisibleother = false;
  }
 async ngOnInit() {
    //*Gettig id Passed through Param
    this.api.showLoader();
    this.ApplicantId=this.activatedRoute.snapshot.queryParams['id'];
    //*Callig api Service getApplicat method to fetch Single user Data & populate data variale
   await this.api.getApplicant(this.ApplicantId).then(response=>{
        console.log(response)
        this.data=JSON.parse(response.data)

        //*Storing response data into Local Variable data

        this.data=this.data.Result;
        console.log(this.data)
        this.StatusId=this.data['StatusId'];
        this.api.getActiveActionButton(this.StatusId).then(but_response=>{
          this.but_data=JSON.parse(but_response.data)
          this.but_data=this.but_data.Result
          console.log(this.but_data)
        })
      }).then(_=>{
        this.api.getOtherReasons().then(res=>{
        this.reasonList=JSON.parse(res.data)
        this.reasonList=this.reasonList['Result']
          this.api.hideLoader();
        console.log(this.reasonList)

      })})

  }
  async onStatusUpdate(currStatusId:number,nextStatusId:number){

    this.nextStatusId=nextStatusId;
    //*Navigate to schedulling Page
    if(currStatusId==3){
    this.router.navigate(['/menu/scheduling-form'],
    {
      queryParams: {
        id:this.ApplicantId,
        nextStatus: nextStatusId
      }
    }
    )
  }
  else if(currStatusId==7){
    console.log("hiiii")
    this.isModalVisibleCI = true;
  }

  else if(currStatusId==4){
    this.isModalVisibleHR = true;
  }

  else{
    // const alert = await this.alertCtrl.create({
    //   header: 'Confirm',
    //   message: 'Are you sure?',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       cssClass: 'secondary',
    //       handler: (blah) => {
    //       }
    //     }, {
    //       text: 'Ok',
    //       handler: () => {
    //         console.log('Confirm Okay');
    //         this.api.StatusUpdate(this.ApplicantId,nextStatusId).then(res=>{
    //           if(res.status==200){
    //             this.router.navigate(['applicant-list-page']).then(() => {
    //               window.location.reload();;
    //             })
    //           }
    //         })
    //       }
    //       }
    //   ]
    // });
    // await alert.present();
    this.isModalVisibleother=true;
  }


  }


  download(fname:string){
    this.api.showLoader();
    const filePath =  this.file.externalRootDirectory + '/Download/' + fname;
    console.log(filePath)
    this.api.downloadFile(fname, filePath).then((res:any) =>{
      console.log(res)
      if(res){
      this.fileOpener.open(filePath, 'application/pdf')
  .then(() => console.log('File opened successfully')).then(_=>{
    this.api.hideLoader();
  })
  .catch((error) => console.error('Error opening file', error));
  }}).catch(error =>{
    console.log(error)
    this.api.showAlertdownloadF();
  });
  }
}
