import { Router, RouterEvent} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
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
      title: 'Schedule Management',
      url: '/user-dash-board',
      icon: 'calendar'
    },
    {
      title: 'Applicant List',
      url: '/applicant-list-page',
      icon: 'list'
    },
    {
      title: 'Register Applicant',
      url: '/applicant-registration-form',
      icon: 'create'
    },

  ];
  constructor(private router:Router , private plt: Platform) {
    // router.events.subscribe((event: RouterEvent) => {
    //   this.showMenu = event.url !== '/login'; // hide menu for login page
    // });
    this.initializeApp();

  }
  initializeApp(){
    this.plt.ready().then(()=>{
      this.router.navigateByUrl('splash-screen');
    })
  }

  ngOnInit() {
}


public handleSplitPaneVisible (event: any) {
  console.log(event);
  this.isSplitPaneVisible = false;
}
}
