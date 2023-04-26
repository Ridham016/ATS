import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {Platform,MenuController} from '@ionic/angular'
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexTooltip,
  ApexPlotOptions,
  ApexLegend
} from "ng-apexcharts";



export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis| any;
  title: ApexTitleSubtitle| any;
  dataLabels: ApexDataLabels| any;
  plotOptions: ApexPlotOptions| any;
  labels: string | any;
  legend:ApexLegend |any;
  tooltip: ApexTooltip | any;
  colors: any;

};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
 datalist : any;
  optionDonut:any;
  chartOptions!: Partial<ChartOptions>;
  constructor(
   private api: ApiService,
  private plt : Platform,
  private menuController : MenuController
  ) {
    this.chartOptions = {
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
    colors:['#007bff', '#008a9b', '#a66b55', '#4680ff', '#6c757d', '#0e9e4a', '#ff2c2c','#ffa21d'],
    title: {
        text: 'Applicant Status',
        align: 'center',
        style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#000'
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
    this.plt.ready().then(async _=>{
      await this.getCounts();
    }).then(()=>{


})
  }

  ngOnInit() {

  }
  ionViewWillEnter() {

    this.api.hideLoader();
    this.menuController.enable(true,'gg');
    console.log("fired")

  }

  ionViewWillLeave() {
    this.menuController.enable(false,'gg');
    console.log("fired1");
    this.menuController.close();
  }
  getCounts(){

      let Dashlist = [];
      this.api.getDashboardData().then (list =>{
        console.log(list)
        Dashlist = JSON.parse(list.data)
        Dashlist = Dashlist['Result']
        console.log(Dashlist)
        this.datalist = Dashlist;
      }).then(()=>{
        this.chartOptions.series= [this.datalist[0].Registered, this.datalist[0].Shortlisted, this.datalist[0].Discarded, this.datalist[0].InterviewScheduled, this.datalist[0].Hold, this.datalist[0].ApplicantsHired, this.datalist[0].Rejected, this.datalist[0].InterviewCancelled]
        this.chartOptions.chart= {
          type: 'donut',
          width: '100%',
          height: 350,
          redrawOnWindowResize: true
      }})

  }

}
