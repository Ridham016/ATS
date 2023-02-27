import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/Model/auth-user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:AuthUser ={
    Email:'', Password:'',RememberMe:false
  };

  rememberMe=false;
  constructor(private router: Router) { }

  ngOnInit() {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      this.user.Email=storedUsername;
      this.user.Password= storedPassword;
      this.rememberMe = true;
    }
  }

  onSubmit(){
    const email = this.user.Email;
    const pass = this.user.Password;
    this.getData(email,pass);

    if(this.rememberMe){
      localStorage.setItem('username',email);
      localStorage.setItem('password',pass);
    }

  }

  getData(email1:string,password1:string){
    if(this.user.Email=='admin@mail.com' && this.user.Password=='admin'){
      this.router.navigate(['/admin-home']);
     }
  }
}
