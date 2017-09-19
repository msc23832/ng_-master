import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sendingpreview',
  templateUrl: './sendingpreview.component.html',
  styleUrls: ['./sendingpreview.component.css']
})
export class SendingpreviewComponent implements OnInit {

  private _HotelInfo: Observable<any[]>;
  private _dataTemplate: Observable<any[]>;
  private _data: Observable<any[]>;
  id: number;
  private Template;
  busy: Subscription;
  private Filter;
  private FilterUser;

  constructor(private _http: Http, private route: ActivatedRoute, private router: Router) {
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
  }

  getHotelInfo() {
    return this._http.get(`${environment.apiUrl}/api/HotelInformation`)
    .subscribe(
      data => this._HotelInfo = data.json(),
      err => this.logError(err),
      () => console.log('GetHotelInfo')
    );
  }

  getData(ID) {
    return this._http.get(`${environment.apiUrl}/api/EditEmailTemplate/${ID}`)
    .subscribe(
      data => this._dataTemplate = data.json(),
      err => this.logError(err),
      () => this.Replace()//console.log(this._dataTemplate)//'EditEmailTemplate : ' + ID)
    );
  }

  Replace() {
    if (localStorage.getItem('FilterUser')) {
      this.FilterUser = JSON.parse(localStorage.getItem('FilterUser'));
      //console.log(this.FilterUser);
    }
    var Message1Replace = this._dataTemplate[0].Message1;
    this._dataTemplate[0].Message1 = Message1Replace.replace('#customer', `${this.FilterUser.firstname}`).replace('#confirm', `${this.FilterUser.Confirmation}`);
    var Message2Replace = this._dataTemplate[0].Message2;
    this._dataTemplate[0].Message2 = Message2Replace.replace('#arrival', `${this.FilterUser.arrival}`).replace('#departure', `${this.FilterUser.departure}`).replace('#rate', `${this.FilterUser.rsl_rateplan}`).replace('#room', `${this.FilterUser.roomtype}`);
  }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  onBack(ID) {
    localStorage.removeItem('FilterUser');
    this.router.navigate(['sendingtemplate']);
  }

  ngOnInit() {
    if (localStorage.getItem('Filter')) {
      this.Filter = JSON.parse(localStorage.getItem('Filter'));
      this.getData(this.Filter[0].Template);
      this.getHotelInfo();
      //console.log(this.Filter);
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('FilterUser');
  }

}
