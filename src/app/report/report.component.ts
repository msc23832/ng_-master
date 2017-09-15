import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [ ReportService ]
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

  constructor(private router: Router, private ReportService: ReportService) {
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
      localStorage.removeItem('FilterReport');
      //filterreport = JSON.parse(localStorage.getItem('FilterReport'));
    }
    filterreport.push(this.Filter);
    localStorage.setItem('FilterReport', JSON.stringify(filterreport));
    this.router.navigate(['reporttemplate']);
  }

  getTemplate() {
    this.busy = this.ReportService.getTemplate().subscribe(
      data => {
        this._data = data;
      },
      err => {
        console.log(err);
      });
  }

  getArnomaMarket() {
    this.busy = this.ReportService.getArnomaMarket().subscribe(
      data => {
        this._ArnomaMarket = data;
      },
      err => {
        console.log(err);
      });
  }

  getArnomaRateplan() {
    this.busy = this.ReportService.getArnomaRateplan().subscribe(
      data => {
        this._ArnomaRateplan = data;
      },
      err => {
        console.log(err);
      });
  }

  getArnomaStatus() {
    this.busy = this.ReportService.getArnomaStatus().subscribe(
      data => {
        this._ArnomaStatus = data;
      },
      err => {
        console.log(err);
      });
  }

  getArnomaPreference() {
    this.busy = this.ReportService.getArnomaPreference().subscribe(
      data => {
        this._ArnomaPreference = data;
      },
      err => {
        console.log(err);
      });
  }

  getArnomaFloor() {
    this.busy = this.ReportService.getArnomaFloor().subscribe(
      data => {
        this._ArnomaFloor = data;
      },
      err => {
        console.log(err);
      });
  }

  getDataUser() {
    this.busy = this.ReportService.getDataUser().subscribe(
      data => {
        this._dataUser = data;
      },
      err => {
        console.log(err);
      });
  }

  process(){
    return Promise.all([this.getTemplate(), this.getArnomaMarket(), this.getArnomaRateplan(),this.getArnomaStatus(),this.getArnomaPreference(),this.getArnomaFloor(),this.getDataUser()]);
  }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  ngOnInit() {
    // this.busy = this.getTemplate();
    // this.busy = this.getArnomaMarket();
    // this.busy = this.getArnomaRateplan();
    // this.busy = this.getArnomaStatus();
    // this.busy = this.getArnomaPreference();
    // this.busy = this.getArnomaFloor();
    // this.busy = this.getDataUser();
    this.process();
  }

}
