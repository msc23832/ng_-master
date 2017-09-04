import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private _data: Observable<any[]>;
  busy: Subscription;

  constructor(private _http: Http) { }

  getAll() {
    return this._http.get(`${environment.apiUrl}/api/Users`)
    .subscribe(
      data => this._data = data.json(),
      err => this.logError(err),
      () => console.log('Users Page')
    );
  }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  ngOnInit() {
    this.busy = this.getAll();
  }

}
