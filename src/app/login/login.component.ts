import { NgModule, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private Login;

  constructor(private router: Router, private LoginService: LoginService) {
    this.Login = {
      User: '',
      Password: ''
    };
  }

  isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return true;
      }
    }
    return false;
  }

  login() {
    console.log(this.Login);
    this.LoginService.loadItem(this.Login).subscribe(
        data => {
          if(this.isEmptyObject(data)) {
            let filterLogin: Array<any> = [];
            if (localStorage.getItem('token')) {
              filterLogin = JSON.parse(localStorage.getItem('token'));
            }
            filterLogin.push(this.Login);
            localStorage.setItem('token', JSON.stringify(filterLogin));
            this.router.navigate(['dashboard']);
          } else {
            console.log('Log In Failed');
          }
        },
        err => {
          console.log(err);
        });

    
    // if (this.Login.Email === 'admin@admin.co.th' && this.Login.Password === 12345 ) {
    //     localStorage.setItem('token','login');
    //     console.log(this.Login);
    //     //Materialize.toast('Success', 4000);
    //     this.router.navigate(['api']);
    // }
    
    //  this.router.navigate(['/home']);
    //}
    //console.log(this.Email);
    //console.log(this.Password);
  }

  ngOnInit() {
  }

}
