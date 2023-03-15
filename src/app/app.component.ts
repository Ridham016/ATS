import { Router, RouterEvent} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  activePageTitle = 'Dashboard';
  activeIndex!:number;
  isSplitPaneVisible: boolean = false;
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
  constructor(private router:Router) {
    // router.events.subscribe((event: RouterEvent) => {
    //   this.showMenu = event.url !== '/login'; // hide menu for login page
    // });
  }

  ngOnInit(): void {

}

public handleSplitPaneVisible (event: any) {
  console.log(event);
  this.isSplitPaneVisible = false;
}
}
