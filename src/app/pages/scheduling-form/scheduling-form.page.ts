import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/constant';
import { Scheduling } from 'src/app/Model/applicant-details';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-scheduling-form',
  templateUrl: './scheduling-form.page.html',
  styleUrls: ['./scheduling-form.page.scss'],
})
export class SchedulingFormPage implements OnInit {
  interviewerList: any = [];
  companyList: any = [];
  positionList: any = [];
  statusID!: number;
  ActionId!: number | any;
  ApplicantId!: number;
  LinkDisabled!: boolean;
  VenueDisabled!: boolean;
  isChecked = false;
  CurrentstatusID: any;

  constructor(
    private plt: Platform,
    private api: ApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  labal = Constant;
  schedule = new Scheduling();

  currentDate = new Date().toISOString();
  ngOnInit() {
    this.ApplicantId = this.activatedRoute.snapshot.queryParams['id'];
    this.statusID = this.activatedRoute.snapshot.queryParams['nextStatus'];
    this.CurrentstatusID =
      this.activatedRoute.snapshot.queryParams['currentStatus'];
    this.plt.ready().then((_) => {
      this.api.showLoader();
      this.api.getCompanyList(this.ApplicantId).then((res) => {
        this.companyList = JSON.parse(res.data);
        console.log(this.companyList);
        if (this.companyList.MessageType === 1) {
          this.companyList = this.companyList['Result'];
          console.log(this.companyList);
        } else if (this.companyList.MessageType === 0) {
          this.api.showAlertF();
        }
      });

      this.api.getInterviwer().then((res) => {
        this.interviewerList = JSON.parse(res.data);
        this.interviewerList = this.interviewerList['Result'];
        console.log(this.interviewerList);
      });
    });
  }
  onVenueChange() {
    if (this.isChecked === true && this.companyList.Venue !== null) {
      this.schedule.Venue = this.companyList.Venue;
    } else {
      this.schedule.Venue = '';
    }
  }

  disableLink(event: any) {
    if (event.detail.value == '1') {
      // value of selected fresher option
      this.LinkDisabled = true;
      this.VenueDisabled = false;
    } else {
      console.log('triggered');
      this.LinkDisabled = false;
      this.VenueDisabled = true;
    }
  }

  async onScheduleCall() {
    console.log(this.schedule);
    await this.api
      .StatusUpdate(this.ApplicantId, this.statusID, this.CurrentstatusID)
      .then((res) => {
        console.log(res.data);
        this.ActionId = JSON.parse(res.data);
        let messType = JSON.parse(res.data);
        this.ActionId = this.ActionId['Result'];
        this.ActionId = this.ActionId[1];
        console.log(this.ActionId);
        debugger;
        if (messType.MessageType == 1) {
          this.api.scheduleMeeting(this.schedule, this.ActionId).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.router.navigate(['/menu/applicant-list-page']).then(() => {
                window.location.reload();
              });
            }
          });
        } else if (messType.MessageType == 0) {
          this.api.showAlertF();
        }
      })
      .catch((error) => {
        if (this.api.handleSessionTimeout(error)) {
          console.log('eror', error);
        }
      });
  }
}
