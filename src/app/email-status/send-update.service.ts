import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SendUpdateService {

  private url: string = environment.apiUrl+"/api/dash/update";
  constructor(private _http: Http) { }

  getupdate() {
    //console.log(this.url);
    return this._http.get(this.url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any ;
  }

}
