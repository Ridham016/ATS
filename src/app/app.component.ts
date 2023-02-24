import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  activePageTitle = 'Dashboard';
  activeIndex!:number;
  Pages = [
    {
      title: 'DashBoard',
      url: '/user-dash-board',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/applicant-list-page',
      icon: 'list'
    },
    {
      title: 'Add Applicant',
      url: '/applicant-registration-form',
      icon: 'create'
    },

  ];
  constructor() {

  }

  ngOnInit(): void {
}
}
