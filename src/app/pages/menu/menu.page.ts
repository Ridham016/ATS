import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router, RouterEvent } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  activePageTitle = 'Dashboard';
  activeIndex!: number;
  visiable = true;
  AdminPages = [
    {
      title: 'Dashboard',
      url: '/menu/dashboard',
      icon: 'house',
      minRole: 'user',
    },
    {
      title: 'Calendar',
      url: '/menu/user-dash-board',
      icon: 'calendar-day',
      minRole: 'user',
    },
    {
      title: 'Schedule Management',
      url: '/menu/applicant-list-page',
      icon: 'list-ul',
      minRole: 'admin',
    },
    {
      title: 'Advanced Search',
      url: '/menu/advance-search',
      icon: 'magnifying-glass',
      minRole: 'user',
    },
    {
      title: 'Job Openings',
      url: '/menu/job-posting',
      icon: 'list-ul',
      minRole: 'user',
    },
  ];
  HRPages = [
    {
      title: 'Dashboard',
      url: '/menu/dashboard',
      icon: 'house',
      minRole: 'user',
    },
    {
      title: 'Calendar',
      url: '/menu/user-dash-board',
      icon: 'calendar-day',
      minRole: 'user',
    },
    {
      title: 'Schedule Management',
      url: '/menu/applicant-list-page',
      icon: 'list-ul',
      minRole: 'admin',
    },
    {
      title: 'Job Openings',
      url: '/menu/job-posting',
      icon: 'list-ul',
      minRole: 'user',
    },
  ];
  InterviwerPages = [
    {
      title: 'Dashboard',
      url: '/menu/dashboard',
      icon: 'house',
      minRole: 'user',
    },
    {
      title: 'Calendar',
      url: '/menu/user-dash-board',
      icon: 'calendar-day',
      minRole: 'user',
    },
    {
      title: 'Schedule Management',
      url: '/menu/applicant-list-page',
      icon: 'list-ul',
      minRole: 'admin',
    },
  ];
  page: any = [];
  selectedpath = '';
  roleID = this.api.getUserRole();
  username = this.api.getUsername();
  customAnimation: any;
  role!: string;
  constructor(
    public api: ApiService,
    private router: Router,
    private animationCtrl: AnimationController
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectedpath = event.url;
      }
    });
  }

  async ngOnInit() {
    await this.loadpages();
    const element = document.getElementById('my-element');
    if (element !== null) {
      this.customAnimation = this.animationCtrl
        .create()
        .addElement(element)
        .duration(500)
        .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
        .easing('ease-in-out');
    }
  }
  doLogout() {
    localStorage.setItem('Token', '');
    localStorage.setItem('isLogedIn', '');
    this.router.navigate(['/login'], {
      skipLocationChange: true,
      replaceUrl: true,
    });
  }
  loadpages() {
    if (this.roleID == '1') {
      this.role = 'Admin';
      console.log('working');
      this.page = this.AdminPages;
    } else if (this.roleID == '2') {
      this.page = this.AdminPages;
      this.role = 'HR';
    } else {
      this.role ='Recruiter'
      this.page = this.InterviwerPages;
    }
    console.log(this.page);
  }
}
