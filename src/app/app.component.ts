import { Router, RouterEvent} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { ApiService } from './services/api.service';
import { Network } from '@ionic-native/network/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private router:Router , private platform: Platform,
    private api:ApiService, private network: Network, private  alertCtrl : AlertController,private diagnostic: Diagnostic ) {
      window.addEventListener('offline',()=>{
          this.openAlert();
      })
  }

 async openAlert(){
  const alert1 = this.alertCtrl.create({
    header: 'Turn On Internet',
    message: 'Please go to your app settings to enable Internet.',
    buttons: [{
    text: 'Cancel',
    handler :() =>{
      this.openAlert();
    }
   },{
    text: 'Open Settings',
    handler: () => {
      this.diagnostic.switchToMobileDataSettings();
   }
    }]
  });
    (await alert1).present();
  }


  initializeApp(){

    let log=localStorage.getItem('isLogedIn');
    if(log==='1')
    {
      let Email = localStorage.getItem('email');
      let Password = localStorage.getItem('password');
      console.log(Email,Password);
      if (Email && Password) {
            this.router.navigateByUrl('/menu/user-dash-board',{replaceUrl:true})
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
     this.initializeApp();
    })
}


}
