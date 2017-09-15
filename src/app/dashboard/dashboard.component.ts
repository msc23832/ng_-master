import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { NvD3Module } from 'ng2-nvd3';
import { EmailStatusComponent } from '../email-status/email-status.component';
import { DatePipe } from '@angular/common';

declare let d3: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})


export class DashboardComponent implements OnInit {
  private count_send: any[];
  private count_users: any[];
  private count_template: any[];
  private Filter;
  private User;
  constructor(private _http: Http, private router: Router, private datePipe: DatePipe) {
    this.count_send = [{
      _count: ''
    }];
    this.count_users = [{
      _count: ''
    }];
    this.count_template = [{
      _count: ''
    }];
    this.Filter = {
      Template: '',
      DateArr: '',
      DateDep: '',
      marketsec: '',
      rateplan: '',
      status: '',
      floor: '',
      preference: '',
      user: ''
    };
  }
  private _data: Observable<any[]>;
  options;
  data;



  ngOnInit(): any {
    this.getAll();
    this.get_send_count();
    this.get_users_count();
    this.get_template_count();
  }

  ReportTemplate() {
    // if (localStorage.getItem('token')) {
    //   this.User = JSON.parse(localStorage.getItem('token'));
    //   this.Filter.User = this.User[0].User;
    // }

    this.Filter.DateArr = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    let filterreport: Array<any> = [];
    if (localStorage.getItem('FilterReport')) {
      filterreport = JSON.parse(localStorage.getItem('FilterReport'));
    }
    filterreport.push(this.Filter);
    localStorage.setItem('FilterReport', JSON.stringify(filterreport));
    this.router.navigate(['reporttemplate']);
  }

  chart_option(dataz) {
    this.options = {
      chart: {
        // type: 'pieChart',
        // height: 250,
        donut: true,
        x: function (d) { return d.keyz; },
        y: function (d) { return d.y; },
        type: "pieChart",
        height: 380,
        showLabels: false,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 10,
            right: 35,
            bottom: 0,
            left: 10
          }
        }
      }
    }
    this.data = dataz;
  }

  getAll() {
    return this._http.get(`${environment.apiUrl}/api/dash`)
      .subscribe(
      data => this._data = data.json(),
      err => console.log(err),
      () => {
        this.chart_option(this._data);
        //console.log(this._data);
      }

      );//subscribe
  }

  get_send_count() {

    return this._http.get(`${environment.apiUrl}/api/dash/send_count`)
      .subscribe(
      data => this.count_send = data.json(),
      err => console.log(err)
      , () => {
        //console.log(this.count_send[0]);
        // return only values greater than 1

      }
      );//subscribe
  }

  get_users_count() {
    return this._http.get(`${environment.apiUrl}/api/dash/users_count`)
      .subscribe(
      data => this.count_users = data.json(),
      err => console.log(err),
      () => {

        //console.log(this.count_users);
      }
      );//subscribe
  }
  get_template_count() {
    return this._http.get(`${environment.apiUrl}/api/dash/template_count`)
      .subscribe(
      data => this.count_template = data.json(),
      err => console.log(err)
      );//subscribe
  }

}
