import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()
export class SendingService {

  constructor(private http: Http) { }

  getHotelInformation(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/HotelInformation`)
    .map((res: Response) => {
        console.log(res.json())
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

}
