import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CalendarComponent, CalendarMode,Step  } from 'ionic2-calendar';
import { IEvent } from 'ionic2-calendar/calendar.interface';
import { SendEmailPage } from '../send-email/send-email.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  collapseCard:any;
  event= {
    title:'',
    startTime:'',
    desc:'',
    endTime:''
  };

  eventSource:any=[];
  currentMonth='';


  public data:any = [];
  public results = [...this.eventSource];

  minDate = new Date();
  visible:any;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,public modalCtrl: ModalController,) {}
  calendar = {
    mode: 'day' as CalendarMode,
    currentDate: new Date(),
    step:30 as Step
};


  @ViewChild(CalendarComponent) mycal!: CalendarComponent;

ViewTitle='Secheduling';

handleChange(event:any) {
  const searchTerm = event.detail.value.toLowerCase();
  let searchSource:any[]=[];
  searchSource = this.eventSource.filter((d:any) => d.title.toLowerCase().includes(searchTerm));

  this.results=searchSource.map(obj=>obj.title);

  console.log(this.results);
}

  ngOnInit(){
    this.resetEvent();
  }

  addEvent(){
   let Copyevent= {
      title:this.event.title,
      startTime: new Date(this.event.startTime),
      desc:this.event.desc,
      endTime: new Date(this.event.endTime)
    };
    this.eventSource.push(Copyevent);

      this.results.push(Copyevent['title']);
    this.mycal.loadEvents();
    this.resetEvent();
  }

  resetEvent(){
    this.event= {
      title:'',
      startTime: new Date().toISOString(),
      desc:'',
      endTime: new Date().toISOString()
    };
  }

  onCurrentDateChanged(){

  }
  reloadSource(){

  }
 async onEventSelected(event: IEvent){
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    console.log(this.eventSource);
    const alert = await this.alertCtrl.create({
      header: 'Title :- '+event.title,
      subHeader: 'Desc :- '+ event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons:  [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {

        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.email();
        },
      }]
      });
    alert.present();
  }
  onViewTitleChanged(title:string){
    this.currentMonth = title;

  }
  onTimeSelected(){


  }
 async onitemSelect(i :any){
    for(var g=0;g<this.eventSource.length;g++)
    if(this.eventSource[g]['title']==i){
      let start = formatDate(this.eventSource[g]['startTime'], 'medium', this.locale);
      let end = formatDate(this.eventSource[g]['endTime'], 'medium', this.locale);
      const alert = await this.alertCtrl.create({
        header: 'Title :- '+this.eventSource[g]['title'],
        subHeader: 'Desc :- '+ this.eventSource[g]['desc'],
        message: 'From: ' + start + '<br><br>To: ' + end,
        buttons:  [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.email();
          },
        }]
        });
      alert.present();

    }


  }

  cngDay(){
    this.calendar.mode='day';
}
  cngWeek(){
    this.calendar.mode='week'
  }
  cngMonth(){
    this.calendar.mode='month'
  }


  async email() {
    const modal = await this.modalCtrl.create({
      component: SendEmailPage,
      animated: true,
      mode:"ios",
      backdropDismiss: false,
      cssClass: 'send-email',
    })

    return await modal.present();
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
      var desc;
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
          title: "All Day - " + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
          desc:"DEMO - "+i
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
          title: "Event - " + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
          desc:"DEMO - "+i
        });
      }
    }
    this.eventSource = events;
    for(i=0;i<this.eventSource.length;i++){
      this.data=events[i].title;
      this.results.push(this.data);
    }


  }
}
