import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-action-history',
  templateUrl: './action-history.page.html',
  styleUrls: ['./action-history.page.scss'],
})
export class ActionHistoryPage implements OnInit {
  list: any;
  ApplicantId!: number;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ApplicantId = this.activatedRoute.snapshot.queryParams['id'];
    this.onloadData();
  }

  onloadData() {
    this.api.getApplicantHistory(this.ApplicantId).then((res) => {
        this.list = JSON.parse(res.data);
        this.list = this.list.Result;
        console.log(this.list);
      })
      .catch((error) => {
        if (this.api.handleSessionTimeout(error)) {
          console.log(error);
          this.api.hideLoader();
          this.api.showAlertF();
        }
      });
  }
}
