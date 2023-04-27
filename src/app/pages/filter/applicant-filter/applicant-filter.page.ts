import { Constant } from 'src/app/constant';
import { ApiService } from 'src/app/services/api.service';
import { ModalController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-filter',
  templateUrl: './applicant-filter.page.html',
  styleUrls: ['./applicant-filter.page.scss'],
})
export class ApplicantFilterPage implements OnInit {
  selectedStatus: any;
  selectedCompanyId: any;
  selectedPositionId: any;
  list: any;
  companylist: any;
  positionlist: any;
  currStatusList: any = [];
  label = Constant;

  CurrentStatus = this.label.StoredStatus;
  CompanyId = this.label.StoredCompanyId;
  PositionId = this.label.StoredPositionId;

  constructor(
    public modalCtrl: ModalController,
    private api: ApiService,
    private plt: Platform
  ) {
    this.selectedStatus = this.CurrentStatus;
    this.selectedCompanyId = this.CompanyId;
    this.selectedPositionId = this.PositionId;
  }

  ngOnInit() {
    let complist = [];
    this.plt.ready().then((_) => {
      this.api.getCompany().then((res) => {
        console.log(res);
        complist = JSON.parse(res.data);
        complist = complist['Result'];
        console.log(complist);
        this.companylist = complist;
      });
      let poslist = [];
      this.api.getPosition().then((ok) => {
        console.log(ok);
        poslist = JSON.parse(ok.data);
        poslist = poslist['Result'];
        console.log(poslist);
        this.positionlist = poslist;
      });
      this.list = this.api.Activelist;
    });
  }

  clearFilters() {
    this.label.StoredStatus = '';
    this.label.StoredCompanyId = '';
    this.label.StoredPositionId = '';
    this.api.UploadStatusId = undefined;
    this.api.CompanyId = undefined;
    this.api.PositionId = undefined;

    this.modalCtrl.dismiss();
  }

  async applyFilters() {
    this.label.StoredStatus = this.selectedStatus;
    this.label.StoredCompanyId = this.selectedCompanyId;
    this.label.StoredPositionId = this.selectedPositionId;
    this.api.UploadStatusId = this.selectedStatus;
    this.api.CompanyId = this.selectedCompanyId;
    this.api.PositionId = this.selectedPositionId;

    await this.modalCtrl.dismiss();
  }
}
