import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()
export class SendingService {

  constructor(private http: Http) { }

  getTemplate(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/EmailTemplate`)
    .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  getArnomaMarket(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/SendEmail/market`)
    .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  getArnomaRateplan(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/SendEmail/rateplan`)
    .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  getArnomaStatus(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/SendEmail/status`)
    .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  getArnomaPreference(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/SendEmail/preference`)
    .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  getArnomaFloor(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/SendEmail/floor`)
    .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

}
