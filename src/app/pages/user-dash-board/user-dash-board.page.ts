import { formatDate } from '@angular/common';
import { Component, OnInit ,ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { CalendarComponent, CalendarMode } from 'ionic2-calendar';
import { IEvent } from 'ionic2-calendar/calendar.interface';
import { AlertController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.page.html',
  styleUrls: ['./user-dash-board.page.scss'],
})
export class UserDashBoardPage implements OnInit {

  eventSource :any = [];
  viewTitle! :string ;
  

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate : new Date()
  };

  @ViewChild(CalendarComponent) myCal! :CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  next(){
    this.myCal.slideNext();
  }

  back(){
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title: string){
    this.viewTitle =title;
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }
    this.eventSource = events;
  }

  removeEvents() {
    this.eventSource = [];
  }
  async onEventSelected(event: IEvent){
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    console.log(this.eventSource);
    const alert = await this.alertCtrl.create({
      header: 'Title : '+event.title,
      subHeader: 'Desc : '+ event.desc,
      message: 'From : ' + start + '<br><br>To : ' + end+ '<br><br>Level: '  +'<br> <br> Interviewer Name:',
      buttons:  [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {

        },
      },
    ]
      });
    alert.present();
  }

}

