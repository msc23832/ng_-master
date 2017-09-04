import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  private _data: Observable<any[]>;
  private _dataUser: Observable<any[]>;
  private _ArnomaMarket: Observable<any[]>;
  private _ArnomaRateplan: Observable<any[]>;
  private _ArnomaStatus: Observable<any[]>;
  private _ArnomaPreference: Observable<any[]>;
  private _ArnomaFloor: Observable<any[]>;
  private Filter;
   busy: Subscription;

  constructor(private _http: Http, private router: Router) {
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

  search() {
    let filterreport: Array<any> = [];
    if (localStorage.getItem('FilterReport')) {
      filterreport = JSON.parse(localStorage.getItem('FilterReport'));
    }
    filterreport.push(this.Filter);
    localStorage.setItem('FilterReport', JSON.stringify(filterreport));
    this.router.navigate(['reporttemplate']);
  }

  getTemplate() {
    return this._http.get(`${environment.apiUrl}/api/EmailTemplate`)
      .subscribe(
      data => this._data = data.json(),
      err => this.logError(err),
      () => console.log('GetEmailTemplate')
      );
  }

  getArnomaMarket() {
    return this._http.get(`${environment.apiUrl}/api/SendEmail/market`)
      .subscribe(
      data => this._ArnomaMarket = data.json(),
      err => this.logError(err),
      () => console.log()
      );
  }

  getArnomaRateplan() {
    return this._http.get(`${environment.apiUrl}/api/SendEmail/rateplan`)
      .subscribe(
      data => this._ArnomaRateplan = data.json(),
      err => this.logError(err),
      () => console.log()
      );
  }

  getArnomaStatus() {
    return this._http.get(`${environment.apiUrl}/api/SendEmail/status`)
    .subscribe(
      data => this._ArnomaStatus = data.json(),
      err => this.logError(err),
      () => console.log()
    );
  }

  getArnomaPreference() {
    return this._http.get(`${environment.apiUrl}/api/SendEmail/preference`)
    .subscribe(
      data => this._ArnomaPreference = data.json(),
      err => this.logError(err),
      () => console.log()
    );
  }

  getArnomaFloor() {
    return this._http.get(`${environment.apiUrl}/api/SendEmail/floor`)
    .subscribe(
      data => this._ArnomaFloor = data.json(),
      err => this.logError(err),
      () => console.log()
    );
  }

  getDataUser() {
    return this._http.get(`${environment.apiUrl}/api/Users`)
      .subscribe(
      data => this._dataUser = data.json(),
      err => this.logError(err),
      () => console.log()
      );
  }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  ngOnInit() {
    this.busy = this.getTemplate();
    this.busy = this.getArnomaMarket();
    this.busy = this.getArnomaRateplan();
    this.busy = this.getArnomaStatus();
    this.busy = this.getArnomaPreference();
    this.busy = this.getArnomaFloor();
    this.busy = this.getDataUser();
  }

}
