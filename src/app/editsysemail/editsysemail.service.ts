import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Injectable()
export class EditsysemailService {
  constructor(private http: Http, private route: ActivatedRoute, private router: Router) { }

  getData(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/EditEmailSystem/${id}`)
      .map((res: Response) => {
        console.log(res.json())
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }
  // getData(ID) {
  //   return this.http.get(`${environment.apiUrl}/api/EditEmailSystem/${ID}`)
  //   .subscribe(
  //     data => this._data = data.json(),
  //     err => this.logError(err),
  //     () => console.log('EditUsers : ' + ID)
  //   );
  // }
  // logError(err: string) {
  //   console.error('There was an error: ' + err);
  // }


  updateData(id, body): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${environment.apiUrl}/api/EditEmailSystem/${id}/save`, bodyString, options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

  deleteData(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/EditEmailSystem/${id}/delete`) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }


}
