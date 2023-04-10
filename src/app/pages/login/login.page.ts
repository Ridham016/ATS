import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/Model/auth-user';
import { Router } from '@angular/router';
import{MenuController} from '@ionic/angular'
import * as CryptoJS from 'crypto-js';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:AuthUser ={
    Email:'', Password:'',RememberMe:false
  };
  userDetails:any=[]
  constructor(private router: Router,private menuController: MenuController,
    private api:ApiService) {

   }

   ionViewWillEnter() {
    this.menuController.enable(false,'gg');
    console.log("fired");
  }

  ionViewWillLeave() {
    this.menuController.enable(true,'gg');
    console.log("fired1");
  }
  ngOnInit() {
    const storedUsername = localStorage.getItem('username');
    let storedPassword = localStorage.getItem('password');
    if(storedPassword){
    storedPassword=this.decyptData(storedPassword);
    }
    if (storedUsername && storedPassword) {
      this.user.Email=storedUsername;
      this.user.Password= storedPassword;
      this.user.RememberMe = true;
    }
  }

  onSubmit(){
console.log(this.user.RememberMe)

    const Email = this.user.Email;
    this.api.showLoader();

   const Password= this.encyptData(this.user.Password);
    if(this.user.RememberMe){
      localStorage.setItem('username',Email);
      localStorage.setItem('password',Password);

    }
    console.log(Email,Password)
    if(Email!='' && Password!=''){

    this.api.dologin({Email,Password}).then(
      res=>{
        this.userDetails = JSON.parse (res.data)
        this.userDetails=this.userDetails['Result']
        this.api.UserName=this.userDetails['UserName']
        this.api.setUserRole(this.userDetails['RoleId'])
        let Token=this.userDetails['Token'];
        this.api.setToken(Token);
        console.log(this.api.RoleId)
        localStorage.setItem('Token',this.api.Token);
        this.router.navigateByUrl('/menu/user-dash-board').then(
          ()=>{
            this.api.hideLoader();
          }
        );

      }

    ).catch(
      error=>{
        console.log(error);
      }
    )
    }
  }


  encyptData(data:string){
    const key = CryptoJS.enc.Utf8.parse('acg7ay8h447825cg');
    const iv = CryptoJS.enc.Utf8.parse('8080808080808080');
    const encryptedData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
    console.log(encryptedData)
    return encodeURIComponent(encryptedData)

  }
  decyptData(data:string){
    data=decodeURIComponent(data);
    const key = CryptoJS.enc.Utf8.parse('acg7ay8h447825cg');
    const iv = CryptoJS.enc.Utf8.parse('8080808080808080');
    const decryptedData = CryptoJS.AES.decrypt(data, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    console.log(decryptedData)
    return decryptedData

  }
}
