import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';
import { Component, OnInit ,ViewChild } from '@angular/core';
import { CalendarComponent, CalendarMode } from 'ionic2-calendar';
import { IEvent } from 'ionic2-calendar/calendar.interface';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

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
    private plt :Platform
    ) {}

  ngOnInit() {
    this.plt.ready().then(_=>{
      this.onloadEventDetails()
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

//   $id
// :
// "1"
// ActionId
// :
// 203
// ApplicantName
// :
// "Meet Kapadia"
// Description
// :
// "Nothing to add"
// Id
// :
// 1
// InterviewerId
// :
// 3
// InterviewerName
// :
// "Darshan Soneji"
// ScheduleDateTime
// :
// "2023-03-11T19:58:00"
// ScheduleLink
// :
// "www.google.com"

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


        events.push({
          ApplicantName:element.ApplicantName,
          desc: element.Description,
          ScheduleLink: element.ScheduleLink,
          startTime:startDateTime,
          endTime:endDateTime,
          InterviewerName:element.InterviewerName,
          title:element.Description,
        });
      })
      this.eventSource=events;

    console.log(this.eventSource);
  })
}

  async onEventSelected(event: IEvent) {
    const start = formatDate(event.startTime, 'shortTime', 'en-US');
    const end = formatDate(event.endTime, 'medium', 'en-US');
    console.log(this.eventSource);
    const alert = await this.alertCtrl.create({
      message: `<div class="cal-alert-time">${start}</div><div>Interview with ${event.ApplicantName}</div><div class="cal-alert-interviewer"><span><ion-icon class="cal-alert-svg"  name="person-sharp"></ion-icon></span>  ${event.InterviewerName}</div>`,
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
