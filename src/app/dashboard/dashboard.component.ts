import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { NvD3Module } from 'ng2-nvd3';
import { EmailStatusComponent } from '../email-status/email-status.component';

declare let d3: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  private count_send: any[];
  private count_users: any[];
  private count_template: any[];
  constructor(private _http: Http) {
    this.count_send = [{
      _count: ''
    }];
    this.count_users = [{
      _count: ''
    }];
    this.count_template = [{
      _count: ''
    }];
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
        console.log(this.count_send[0]);
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

        console.log(this.count_users);
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
