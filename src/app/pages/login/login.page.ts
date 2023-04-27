import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/Model/auth-user';
import { Router } from '@angular/router';
import { MenuController, Platform, AlertController } from '@ionic/angular';

import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
    private api: ApiService
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
          console.log('Status', error.status);
        });
    }
  }
}
