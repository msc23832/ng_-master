import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sysemail',
  templateUrl: './sysemail.component.html',
  styleUrls: ['./sysemail.component.css']
})
export class SysemailComponent implements OnInit {

  private _data: Observable<any[]>;
  busy: Subscription;

  constructor(private _http: Http) {
  }
  
  getAll() {
    return this._http.get(`${environment.apiUrl}/api/EmailSystem`)
    .subscribe(
      data => this._data = data.json(),
      err => this.logError(err),
      () => console.log('Email System Page')
    );
  }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  ngOnInit() {
    this.busy = this.getAll();
  }

}
