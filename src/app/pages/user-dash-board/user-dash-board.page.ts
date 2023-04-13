import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';
import { Component, OnInit ,ViewChild } from '@angular/core';
import { CalendarComponent, CalendarMode } from 'ionic2-calendar';
import { IEvent } from 'ionic2-calendar/calendar.interface';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import{MenuController} from '@ionic/angular'
import { Router } from '@angular/router';

function getRandomDate(): Date {
  const date = new Date();
  const daysOffset = Math.floor(Math.random() * 90) - 45;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + daysOffset);
}

function getRandomTime(startDate: Date): Date {
  const minutesOffset = Math.floor(Math.random() * 24 * 60);
  return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, startDate.getMinutes() + minutesOffset);
}

@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.page.html',
  styleUrls: ['./user-dash-board.page.scss'],
})
export class UserDashBoardPage implements OnInit {

  eventSource:IEvent[] = [];
  list:any;
  viewTitle!: string;

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal!: CalendarComponent;

  constructor(private alertCtrl: AlertController,
    private api:ApiService,
    private plt :Platform,
    private menuController:MenuController,
    private router : Router
    ) {}


    ionViewWillEnter() {
      this.plt.backButton.subscribe(() => {
        console.log('CAlled');
        this.api.presentAlertConfirm();
      });
      this.api.hideLoader();
      this.menuController.enable(true,'gg');
      console.log("fired")

    }

    ionViewWillLeave() {
      this.menuController.enable(false,'gg');
      console.log("fired1");
      this.menuController.close();
    }
 async ngOnInit() {
    this.plt.ready().then(async _=>{
     await this.onloadEventDetails()
    })
  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onViewTitleChanged(title: string) {
    this.viewTitle = title;
  }


  onloadEventDetails(){
    this.api.showLoader();
    const events: any[] = [];
    this.api.getEventDetails().then(res=>{
      this.list=JSON.parse(res.data);
      this.list=this.list['Result'];
      console.log(this.list);
      this.list.forEach((element: any) => {
        const startDateTime= new Date(element.ScheduleDateTime)
        const endDateTime = new Date(startDateTime);
        endDateTime.setHours(startDateTime.getHours() + 1);
        let mode
        if(element.Mode=='1'){
          mode='Online'
        }
        else if(element.Mode=='0'){
          mode='Offline'
        }

        events.push({
          ApplicantName:element.ApplicantName,
          desc: element.Description,
          ScheduleLink: element.ScheduleLink,
          startTime:startDateTime,
          endTime:endDateTime,
          InterviewerName:element.InterviewerName,
          title:element.Description,
          Mode:mode,
        });
      })
      this.eventSource=events;

    console.log(this.eventSource);
  }).catch(error=>{
    if( this.api.handleSessionTimeout(error)){
      this.api.showAlertF();
      console.log('eror',error)
    }
    })
}

  async onEventSelected(event: IEvent) {
    const start = formatDate(event.startTime, 'shortTime', 'en-US');
    const end = formatDate(event.endTime, 'medium', 'en-US');
    console.log(this.eventSource);
    const alert = await this.alertCtrl.create({
      // message: `<div class="cal-alert-time"><ion-icon class="cal-alert-svg" name="time-outline"></ion-icon>${start}</div><div class="cal-alert-time fw-bold"><ion-icon class="cal-alert-svg"  name="person-sharp"></ion-icon> ${event.ApplicantName}</div><div class="cal-alert-interviewer"><span><ion-icon class="cal-alert-svg2" name="attach-outline"></ion-icon></span>${event.InterviewerName}</div>`,
      message: `<div><p class="mb-2"><span><ion-icon class="cal-alert-svg" name="time-outline"></ion-icon></span><span>${start}</span></p><p class="mb-2"><span><ion-icon class="cal-alert-svg" name="person-sharp"></ion-icon></span><span>Meeting with <span class="fw-bold">${event.ApplicantName}</span></span></p><p class="mb-0"><span> <ion-icon class="cal-alert-svg2" name="attach-outline"></ion-icon>By ${event.InterviewerName} </span></p>${event.Mode}</div>`,
      cssClass:'cal-alert',
       buttons:  [{
        text: 'ok',
        role: 'cancel',
        handler: () => {},
      }],
    });
    alert.present();
  }


  handleRefresh(event:any) {
    setTimeout(() => {
      this.onloadEventDetails();
      event.target.complete();
    }, 2000);
  }
}
