import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.page.html',
  styleUrls: ['./send-email.page.scss'],
})
export class SendEmailPage implements OnInit {

  email={
    to:[],
    cc:[]=[],
    bcc:[],
    subject:'',
    body:'',
  }
  constructor(
    public modalCtrl: ModalController,
    private emailComposer: EmailComposer,
  ) { }

  ngOnInit() {
  }

  onSubmit(){

    console.log(this.email.cc)
    this.emailComposer.isAvailable().then((available:boolean)=>{
      if(available){
        this.emailComposer.open(this.email);
      }
    })
  }

 async dismiss(){
    await this.modalCtrl.dismiss();
  }
}
