import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/constant';
import { ModalController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-advance-search-filter',
  templateUrl: './advance-search-filter.page.html',
  styleUrls: ['./advance-search-filter.page.scss'],
})
export class AdvanceSearchFilterPage implements OnInit {
  selectedStatus: any;
  selectedStartDate: any;
  selectedEndDate: any;
  selectedCompanyId: any;
  selectedPositionId: any;
  list: any;
  companylist: any;
  positionlist: any;
  label = Constant;

  CurrentStatus = this.label.StoredStatus;
  StartDate = this.label.StoredStartDate;
  EndDate = this.label.StoredEndDate;
  CompanyId = this.label.StoredCompanyId;
  PositionId = this.label.StoredPositionId;

  constructor(
    public modalCtrl: ModalController,
    private api: ApiService,
    private plt: Platform
  ) {
    this.selectedStatus = this.CurrentStatus;
    this.selectedStartDate = this.StartDate;
    this.selectedEndDate = this.EndDate;
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
    this.label.StoredStartDate = '';
    this.label.StoredEndDate = '';
    this.label.StoredCompanyId = '';
    this.label.StoredPositionId = '';
    this.api.UploadStatusId = undefined;
    this.api.StartDate = undefined;
    this.api.EndDate = undefined;
    this.api.CompanyId = undefined;
    this.api.PositionId = undefined;
    this.modalCtrl.dismiss();
  }

  async applyFilters() {
    this.label.StoredStatus = this.selectedStatus;
    this.label.StoredCompanyId = this.selectedCompanyId;
    this.label.StoredPositionId = this.selectedPositionId;
    this.label.StoredStartDate = this.selectedStartDate;
    this.label.StoredEndDate = this.selectedEndDate;
    this.api.UploadStatusId = this.selectedStatus;
    this.api.CompanyId = this.selectedCompanyId;
    this.api.PositionId = this.selectedPositionId;
    this.api.StartDate = this.selectedStartDate.split('T')[0];
    this.api.EndDate = this.selectedEndDate.split('T')[0];
    await this.modalCtrl.dismiss();
  }
}
