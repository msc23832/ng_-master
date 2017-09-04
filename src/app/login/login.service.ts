import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  constructor(private router: Router, private http: Http) { }

  canActivate() {
    if (localStorage.getItem('token')){
      
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  loadItem(body): Observable<any[]> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${environment.apiUrl}/api/login`, bodyString, options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

}