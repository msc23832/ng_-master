import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as io from 'socket.io-client';

@Injectable()
export class SendUpdateService {

  private socket;
  private url = environment.apiUrl;
  constructor(private _http: Http) { }

  // getupdate() {
  //   //console.log(this.url);
  //   return this._http.get(this.url)
  //     .map((res: Response) => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any ;
  // }

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  getupdate() {
    let observable = new Observable(observer => {
      //console.log(this.url);
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        //console.log(data);
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
