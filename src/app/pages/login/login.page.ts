import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/Model/auth-user';
import { Router } from '@angular/router';
import { MenuController, Platform, AlertController, ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email1!: string;
  digit1!: string;
  countdownText!:string;
  countdownTime: number = 60;
  newPassword!: string;
  userid!:number;
  modelVisible=false;
  confirmPassword!: string;
  currentStep: number = 1;
  response: any;
  user: AuthUser = {
    Email: '',
    Password: '',
    RememberMe: false,
  };
  hide = true;
  userDetails: any = [];
  constructor(
    private router: Router,
    private menuController: MenuController,
    private api: ApiService,
    private modalController: ModalController,
    private toastController:ToastController
  ) {}

  ionViewWillEnter() {
    this.menuController.enable(false, 'gg');
    console.log('fired');
    const storedUsername = localStorage.getItem('email');
    let storedPassword = localStorage.getItem('password');
    if (storedPassword) {
      storedPassword = this.api.decyptData(storedPassword);
    }
    if (storedUsername && storedPassword) {
      this.user.Email = storedUsername;
      this.user.Password = storedPassword;
      this.user.RememberMe = true;
    }
  }
  togglePassword() {
    this.hide = !this.hide;
  }

  ionViewWillLeave() {
    this.menuController.enable(true, 'gg');
    console.log('fired1');
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.user.RememberMe);

    const Email = this.user.Email;
    this.api.showLoader();

    const Password = this.api.encyptData(this.user.Password);

    console.log(Email, Password);
    if (Email != '' && Password != '') {
      this.api
        .dologin({ Email, Password })
        .then((res) => {
          console.log(res);
          this.userDetails = JSON.parse(res.data);
          console.log(this.userDetails);
          let restype = this.api.handleMessageType(this.userDetails);
          console.log(restype);
          if (restype) {
            if (this.user.RememberMe) {
              localStorage.setItem('email', Email);
              localStorage.setItem('password', Password);
            } else {
              localStorage.setItem('email', '');
              localStorage.setItem('username', '');
              localStorage.setItem('password', '');
            }
            this.userDetails = this.userDetails['Result'];
            let UserName = this.userDetails['User'];
            this.api.setUsername(UserName);
            localStorage.setItem('username', UserName);
            this.api.setUserRole(this.userDetails['RoleId']);
            let Token = this.userDetails['Token'];
            this.api.setToken(Token);
            console.log(this.api.RoleId);
            localStorage.setItem('Token', this.api.Token);
            this.user.Email = '';
            this.user.Password = '';
            this.router.navigateByUrl('/menu/dashboard', { replaceUrl: true });
            localStorage.setItem('isLogedIn', '1');
          } else {
            this.api.loginFailed();
          }
        })
        .catch((error) => {
          this.api.loginFailed();
          console.log('Status', error);
        });
    }
  }
   sendEmail() {
    // code to send password reset email
    this.api.generatecode(this.email1).then((res) => {
      console.log(res.data);
      this.response=JSON.parse(res.data);
      const result=this.response['Result'];
      const MessageType=this.response['MessageType'];
      if(MessageType==1){
        this.userid=result;
        this.currentStep = 2;
        if(this.currentStep==2){
          this.startCountdown();
        }
      }
    }).catch((error) => {
      this.presentToast()
    })
  }

 validateCode() {
    // code to validate reset code
    console.log(this.digit1)
    this.api.verifyCode(this.digit1).then((res) => {
      console.log(res.data);
      this.response=JSON.parse(res.data);
      const result=this.response['Result'];
      const MessageType=this.response['MessageType'];
      if(MessageType==1 ){
        this.currentStep = 3;
      }
    }).catch((error) => {
      this.presentToast()
    })
  }

 resetPassword() {
  const pass=this.api.encyptData(this.newPassword);
  this.api.resetpassword(pass,this.userid).then((res) => {
    console.log(res.data);
    this.response=JSON.parse(res.data);
    const result=this.response['Result'];
    const MessageType=this.response['MessageType'];
    if(MessageType==1 ){
      this.dismissModal();
    }
  }).catch((error) => {
    this.presentToast()
  })


  }

  opemModel(){
    this.modelVisible=true;
  }
  onDismiss(){
    this.modelVisible=false;
    if (this.currentStep==3){
      this.currentStep=1
    }
  }
  async dismissModal() {
    await this.modalController.dismiss();
    this.modelVisible=false
  }
  onOtpChange(event:any){
    this.digit1=event;
    if(event.length==6){
      this.validateCode();
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hello Styled World!',
      duration: 3000,
      cssClass: 'custom-toast',
    });

    await toast.present();
  }

  startCountdown() {
    const intervalId = setInterval(() => {
      if (this.countdownTime > 0) {
        this.countdownTime--;
        const minutes = Math.floor(this.countdownTime / 60);
        const seconds = this.countdownTime % 60;
        this.countdownText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        clearInterval(intervalId);
        this.countdownText = '';
      }
    }, 1000);
  }
}
