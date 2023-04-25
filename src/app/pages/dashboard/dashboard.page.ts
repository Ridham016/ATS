import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {Platform} from '@ionic/angular'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 datalist : any;
  constructor( private api: ApiService, private plt : Platform) {
  }

  ngOnInit() {
    this.plt.ready().then(async _=>{
      debugger
      await this.getCounts();

    })
  }

  getCounts(){
      let Dashlist = [];
      this.api.getDashboardData().then (list =>{
        console.log(list)
        Dashlist = JSON.parse(list.data)
        Dashlist = Dashlist['Result']
        console.log(Dashlist)
        this.datalist = Dashlist;
      })
  }
}
