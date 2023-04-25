import { Router, RouterEvent} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, AlertButton } from '@ionic/angular';
import { ApiService } from './services/api.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  disconnectSubscription: any;
  networkAlert: any;
  util: any;
  connectSubscription: any;
  constructor(private router:Router , private platform: Platform,
    private api:ApiService, private network: Network, private  alertCtrl : AlertController,private diagnostic: Diagnostic ) {

  }
checkNet(){
  // window.addEventListener('offline',async (res)=>{
  //   console.log(res)
  //   this.openAlert();

  // })
  // window.addEventListener('online',async (res)=>{
  //   const loading = await this.alertCtrl.getTop();
  //   if (loading) {
  //     await loading.dismiss();
  //   }
  // })


  this.disconnectSubscription = this.network.onDisconnect().subscribe(async () => {
    console.log('network was disconnected :-(');
    this.networkAlert = await this.createAlert('No Internet', false, 'Please Check you internet Connection and try again',{
    text: '',
    role: '',
    cssClass: 'secondary',
    });
    this.networkAlert.present();
    });
    this.connectSubscription = this.network.onConnect().subscribe(() => {
    console.log('network connected!');
    if(this.networkAlert) {
    this.networkAlert.dismiss();
    }
    });
  }



  async createAlert(header: any, backdropDismiss: any, message: any, buttonOptions1: string | AlertButton, buttonOptions2?: string | AlertButton): Promise<HTMLIonAlertElement> {
    this.diagnostic.switchToMobileDataSettings();
    const alert = await this.alertCtrl.create({
    header,
    backdropDismiss,
    message,
    cssClass:'offile-alert',
    buttons: !buttonOptions2 ? [buttonOptions1] : [buttonOptions1, buttonOptions2]
    });
    return alert;
    }

  initializeApp(){

    let log=localStorage.getItem('isLogedIn');
    if(log==='1')
    {
      let Email = localStorage.getItem('email');
      let Password = localStorage.getItem('password');
      let Token=localStorage.getItem('Token') as string;
      if (Email && Password && Token)  {
        this.api.setToken(Token);
            this.router.navigateByUrl('/dashboard',{replaceUrl:true})
            localStorage.setItem('isLogedIn','1');
          }
          else{
            this.api.loginFailed()
            this.router.navigateByUrl('/login',{replaceUrl:true})
          }
        }
        else{
         this.router.navigateByUrl('/login',{replaceUrl:true})
        }

  }

  async ngOnInit() {
    await  this.platform.ready().then( () =>{
      this.checkNet();
     this.initializeApp();
    })


}



}
