import { Router, RouterEvent} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private router:Router , private platform: Platform,
    private api:ApiService) {

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
