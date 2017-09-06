import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { SendingService } from './sending.service';


@Component({
  selector: 'app-sending',
  templateUrl: './sending.component.html',
  styleUrls: ['./sending.component.css'],
  providers: [ SendingService ]
})
export class SendingComponent implements OnInit {

  private _data;
  private _ArnomaMarket;
  private _ArnomaRateplan;
  private _ArnomaStatus;
  private _ArnomaPreference;
  private _ArnomaFloor;
  private Filter;
  private User;
  busy: Subscription;

  constructor(private router: Router, private SendingService: SendingService) {
    this.Filter = {
      Template: '',
      DateArr: '',
      DateDep: '',
      marketsec: '',
      rateplan: '',
      status: '',
      floor: '',
      preference: '',
      User: ''
    };
    this.User = [{
      User: '',
      Password: ''
    }];
  }

  search() {
    let filtersending: Array<any> = [];
    if (localStorage.getItem('Filter')) {
      filtersending = JSON.parse(localStorage.getItem('Filter'));
    }
    if (localStorage.getItem('token')) {
      this.User = JSON.parse(localStorage.getItem('token'));
    }
    this.Filter.User = this.User[0].User;
    filtersending.push(this.Filter);
    localStorage.setItem('Filter', JSON.stringify(filtersending));
    //console.log(this.Filter);
    this.router.navigate(['sendingtemplate']);
  }

  getTemplate() {
    this.busy = this.SendingService.getTemplate().subscribe(
      data => {
        this._data = data;
      },
      err => {
        console.log(err);
      });
  }

  getArnomaMarket() {
    this.busy = this.SendingService.getArnomaMarket().subscribe(
      data => {
        this._ArnomaMarket = data;
      },
      err => {
        console.log(err);
      });
  }

  getArnomaRateplan() {
    this.busy = this.SendingService.getArnomaRateplan().subscribe(
      data => {
        this._ArnomaRateplan = data;
      },
      err => {
        console.log(err);
      });
  }

  getArnomaStatus() {
    this.busy = this.SendingService.getArnomaStatus().subscribe(
      data => {
        this._ArnomaStatus = data;
      },
      err => {
        console.log(err);
      });
  }

  getArnomaPreference() {
    this.busy =  this.SendingService.getArnomaPreference().subscribe(
      data => {
        this._ArnomaPreference = data;
      },
      err => {
        console.log(err);
      });
  }

  getArnomaFloor() {
    this.busy = this.SendingService.getArnomaFloor().subscribe(
      data => {
        this._ArnomaFloor = data;
      },
      err => {
        console.log(err);
      });

  }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }
  process(){
    return Promise.all([this.getTemplate(), this.getArnomaMarket(), this.getArnomaRateplan(),this.getArnomaStatus(),this.getArnomaPreference(),this.getArnomaFloor()]);

  }

  ngOnInit() {

    // this.busy = this.getTemplate();
    // this.busy = this.getArnomaMarket();
    // this.busy = this.getArnomaRateplan();
    // this.busy = this.getArnomaStatus();
    // this.busy = this.getArnomaPreference();
    // this.busy = this.getArnomaFloor();

    // Parallel
    this.process();
  }

}
