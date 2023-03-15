import { formatDate } from '@angular/common';
import { Component, OnInit ,ViewChild } from '@angular/core';
import { CalendarComponent, CalendarMode } from 'ionic2-calendar';
import { IEvent } from 'ionic2-calendar/calendar.interface';
import { AlertController } from '@ionic/angular';

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

  eventSource: IEvent[] = [];
  viewTitle!: string;

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal!: CalendarComponent;

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title: string) {
    this.viewTitle = title;
  }

  createRandomEvents() {
    const events: IEvent[] = [];
    for (let i = 0; i < 50; i++) {
      const date = getRandomDate();
      const eventType = Math.floor(Math.random() * 2);
      const startDateTime = getRandomTime(date);
      const endDateTime = getRandomTime(new Date(startDateTime.getTime() + Math.floor(Math.random() * 180)));
      const isAllDay = eventType === 0;
      const eventTitle = isAllDay ? `All Day - ${i}` : `Event - ${i}`;
      events.push({
        title: eventTitle,
        startTime: startDateTime,
        endTime: endDateTime,
        allDay: isAllDay,
        desc: '',
        TypeofEvent: ''
      });
    }
    this.eventSource = events;
  }

  removeEvents() {
    this.eventSource = [];
  }

  async onEventSelected(event: IEvent) {
    const start = formatDate(event.startTime, 'medium', 'en-US');
    const end = formatDate(event.endTime, 'medium', 'en-US');
    console.log(this.eventSource);
    const alert = await this.alertCtrl.create({
      header: 'Title : ' + event.title,
      subHeader: 'Desc : ' + event.desc,
      message: `From : ${start}<br><br>To : ${end}<br><br>Level: <br> <br> Interviewer Name:`,
      buttons:  [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {},
      }],
    });
    alert.present();
  }

}
