import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  activePageTitle = 'Dashboard';
  activeIndex!:number;
  visiable=true;
   AdminPages = [
    {
      title: 'Dashboard',
      url: '/menu/user-dash-board',
      icon: 'calendar',
      minRole: 'user'
    },
    {
      title: 'Applicant List',
      url: '/menu/applicant-list-page',
      icon: 'list',
      minRole: 'admin'
    },
    {
      title: 'Register Applicant',
      url: '/menu/applicant-registration-form',
      icon: 'create',
      minRole: 'admin'
    },
    {
      title: 'Advanced Search',
      url: '/menu/advance-search',
      icon: 'search',
      minRole: 'user'
    },
  ];
   HRPages = [
    {
      title: 'Dashboard',
      url: '/menu/user-dash-board',
      icon: 'calendar',
      minRole: 'user'
    },
    {
      title: 'Applicant List',
      url: '/menu/applicant-list-page',
      icon: 'list',
      minRole: 'admin'
    },
    {
      title: 'Register Applicant',
      url: '/menu/applicant-registration-form',
      icon: 'create',
      minRole: 'admin'
    },
  ];
   InterviwerPages = [
    {
      title: 'Dashboard',
      url: '/menu/user-dash-board',
      icon: 'calendar',
      minRole: 'user'
    },
    {
      title: 'Applicant List',
      url: '/menu/applicant-list-page',
      icon: 'list',
      minRole: 'admin'
    },

  ];
page:any=[];
 roleID=this.api.getUserRole();
  constructor(
    public api:ApiService,
    private router:Router
  ) {

  }

 async ngOnInit() {
await this.loadpages();
}
doLogout(){
  localStorage.setItem('Token','')
  this.router.navigate(['/login'],{replaceUrl:true})
}
loadpages(){

  if(this.roleID=='1'){
    console.log('working')
      this.page=this.AdminPages;
  }
  else if(this.roleID=='2'){
    this.page=this.HRPages;
  }
  else{
    this.page=this.InterviwerPages
  }
  console.log(this.page)
}
}
