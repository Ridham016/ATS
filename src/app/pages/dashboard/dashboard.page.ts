import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Platform, MenuController } from '@ionic/angular';
import SwiperCore,{ Pagination } from 'swiper';
SwiperCore.use([Pagination]);
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexTooltip,
  ApexPlotOptions,
  ApexLegend,
  ApexFill,
  ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  title: ApexTitleSubtitle | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  labels: string | any;
  legend: ApexLegend | any;
  tooltip: ApexTooltip | any;
  colors: any;
  fill:ApexFill|any;
  yaxis:ApexYAxis|any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})


export class DashboardPage implements OnInit {
[x: string]: any;


  @ViewChild("chart") chart!: ChartComponent;
 datalist : any;
 job_count:number=0;
 schedull_count:number=0;
 hired_count:number=0;
 registred_count:number=0;
mode:any=0;
  chartOptionsD!: Partial<ChartOptions>;
  chartOptionsS!: Partial<ChartOptions>;
  registred: any=[];
  accepted: any=[];
  rejected: any=[];
  month:any=[];
  r: any;
  constructor(
    public api: ApiService,
    private plt: Platform,
    private menuController: MenuController
  ) {
    this.chartOptionsD = {
      chart:{
        type: 'donut',
        width: '100%',
        height: 350,
        redrawOnWindowResize: true
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          customScale: 0.8,
          donut: {
            size: '60%',
          },
          offsetY: 20,
        },
      },
      colors: [
        '#007bff',
        '#008a9b',
        '#a66b55',
        '#4680ff',
        '#6c757d',
        '#0e9e4a',
        '#ff2c2c',
        '#ffa21d',
      ],
      title: {
        text: 'Applicant Status',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000',
        },
    },
    series: [0,0,0,0,0,0,0,0],
    labels: ['Registered', 'Shortlisted', 'Discarded', 'Interview Scheduled', 'Hold', 'Hired', 'Rejected', 'Interview Cancelled'],
    legend: {
        position: 'bottom'
    },
    tooltip: {
      enabled:true
    }
}
    this.chartOptionsS=
      {
        chart: {
            type: 'bar',
            height: 380,
            width: '100%',
            stacked: true,
        },
        plotOptions: {
            bar: {
                columnWidth: '45%',
            }
        },
        fill: {
            opacity: 1,
        },
        colors: ['#007bff', '#3ecd5e', '#e44022'],
        series: [],
        labels: this.month,
        xaxis: {
            labels: {
                show: true
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: '#78909c'
                }
            }
        },
        title: {
            text: 'Number of Offers',
            align: 'center',
            style: {
                fontSize: '16px'
            }
        }
    }
    this.plt.ready().then(async _=>{
       this.getCounts(this.mode);
       this.getdata();
    })
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.api.hideLoader();
    this.menuController.enable(true, 'gg');
    console.log('fired');
  }

  ionViewWillLeave() {
    this.menuController.enable(false, 'gg');
    console.log('fired1');
    this.menuController.close();
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      this.getCounts(this.mode);
      event.target.complete();
    }, 2000);
  }



async getdata(){
this.api.showLoader();
let Dashlist = [];
await this.api.getDashboardDataStackedBar().then (list =>{
  console.log(list)
  Dashlist = JSON.parse(list.data)
  Dashlist = Dashlist['Result']
  console.log('Stacked',Dashlist)
  for (let index = 0; index < Dashlist.length; index++) {
    this.registred.push(Dashlist[index].ApplicantsRegistered)
    this.rejected.push(Dashlist[index].ApplicantsRejected)
    this.accepted.push(Dashlist[index].ApplicantsHired)
    this.month.push(Dashlist[index].Months)
  }
}).then(() => {
  this.chartOptionsS.series=[{
    name: "Applicants Registered",
    data: this.registred
}, {
    name: "Accepted",
    data: this.accepted,
}, {
    name: "Rejected",
    data: this.rejected,
}];
})
}
 async getCounts(tf:any){
  this.mode=tf
      this.api.showLoader();
      let Dashlist = [];
      await this.api.getDashboardDataDounet(this.mode).then (list =>{
        console.log(list)
        Dashlist = JSON.parse(list.data)
        Dashlist = Dashlist['Result']
        console.log(Dashlist)
        this.datalist = Dashlist;
      })
      .then(() => {
        this.chartOptionsD.series = [
          this.datalist[0].Registered,
          this.datalist[0].Shortlisted,
          this.datalist[0].Discarded,
          this.datalist[0].InterviewScheduled,
          this.datalist[0].Hold,
          this.datalist[0].ApplicantsHired,
          this.datalist[0].Rejected,
          this.datalist[0].InterviewCancelled,
        ];

     if(this.datalist){
      let min=Math.min(this.datalist[0]['ApplicantsRegistered'], this.datalist[0]['ApplicantsHired'],this.datalist[0]['JobOpenings'],this.datalist[0]['MeetingsScheduled'])
       console.log(min)
       const list=this.datalist[0]
       this.startCounter(1,list['MeetingsScheduled'],Math.floor(list['MeetingsScheduled']/min))
       this.startCounter(2,list['JobOpenings'],Math.floor(list['JobOpenings']/min))
       this.startCounter(3,list['ApplicantsRegistered'],Math.floor(list['ApplicantsRegistered']/min))
       this.startCounter(4,list['ApplicantsHired'],Math.floor(list['ApplicantsHired']/min))
       this.api.hideLoader();
     }
    }).catch(error => {
      this.api.hideLoader();
      if( this.api.handleSessionTimeout(error)){
        this.api.showAlertF();
        console.log('eror',error)
      }
      else{
        console.log(error);
      }
    })

  }

  startCounter(cardnumbner:number,targetValue: any, incrementValue: any) {
    // setInterval(() =>{
    //   if(cardnumbner===1){
    //     if(this.schedull_count<targetValue){
    //       if(this.schedull_count+incrementValue>targetValue){
    //         this.schedull_count=targetValue
    //       }
    //       else{
    //         this.schedull_count+=incrementValue;
    //       }
    //     }
    //     else if(this.schedull_count>=targetValue){
    //       this.schedull_count=targetValue
    //     }

    //   }
    //   else if(cardnumbner===2){
    //     if(this.job_count<targetValue){
    //       this.job_count+=incrementValue
    //     }
    //     else if(this.job_count>=targetValue){
    //       this.job_count=targetValue
    //     }

    //   }
    //   else if(cardnumbner===3){
    //     if(this.registred_count<targetValue){
    //       this.registred_count+=incrementValue
    //     }
    //     else if(this.registred_count>=targetValue){
    //       this.registred_count=targetValue
    //     }

    //   }
    //   else if(cardnumbner===4){
    //     if(this.hired_count<targetValue){
    //       this.hired_count+=incrementValue
    //     }
    //     else if(this.hired_count>=targetValue){
    //       this.hired_count=targetValue
    //     }

    //   }
    // },100)
    const duration = 2000
    const increment = (targetValue - 0) / duration;
    let currentTime = 0;
    const interval = setInterval(() => {
     currentTime += 150; // the interval is set to 100 milliseconds
      if (currentTime >= duration) {
        clearInterval(interval);
        currentTime = duration;
      }
      const currentValue = Math.floor(0 + increment * currentTime);
      if (cardnumbner === 1) {
        this.schedull_count = currentValue;
      } else if (cardnumbner === 2) {
        this.job_count = currentValue;
      } else if (cardnumbner === 3) {
        this.registred_count = currentValue;
      } else if (cardnumbner === 4) {
        this.hired_count = currentValue;
      }
    }, 100);
}
}
