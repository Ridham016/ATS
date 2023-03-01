import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/constant';
import { Scheduling } from 'src/app/Model/applicant-details';

@Component({
  selector: 'app-scheduling-form',
  templateUrl: './scheduling-form.page.html',
  styleUrls: ['./scheduling-form.page.scss'],
})
export class SchedulingFormPage implements OnInit {

  constructor() { }
  labal=Constant;

  currentDate = new Date().toISOString();
  ngOnInit() {
  }

  schedule = new Scheduling();
}
