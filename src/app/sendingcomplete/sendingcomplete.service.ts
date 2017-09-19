import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

@Injectable()
export class SendingcompleteService {

  private socket;
  private url = `${environment.apiUrl}`;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) { }

  ResendEmail(body): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${environment.apiUrl}/api/SendEmail/resend`, bodyString, options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

  // getEmailSending(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/api/SendEmail`) // ...using post request
  //     .map((res: Response) => {
  //       return res.json()
  //     }) // ...and calling .json() on the response to return data
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  // }

  sendMessage(message) {
    this.socket.emit('loadEmailSend', message);
  }

  getEmailSending() {
    let observable = new Observable(observer => {
      //console.log(this.url);
      this.socket = io(this.url);
      this.socket.on('message2', (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        //console.log('err');
        this.socket.disconnect();
      };
    })
    return observable;
  }

}
