import { NgModule, Component, OnInit, ViewChild } from '@angular/core';
import  {  Router  }  from  '@angular/router';
import { LoginService } from '../login/login.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private Login;
  @ViewChild('ModalWrong')
  ModalWrong: ModalComponent;
  @ViewChild('ModalRequired')
  ModalRequired: ModalComponent;

  constructor(private  router: Router, private LoginService: LoginService) {
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
    if ((this.Login.User != '') && (this.Login.Password != '')) {
      this.LoginService.loadItem(this.Login).subscribe(
        data => {
          if (this.isEmptyObject(data)) {
            let filterLogin: Array<any> = [];
            if (localStorage.getItem('token')) {
              filterLogin = JSON.parse(localStorage.getItem('token'));
            }
            filterLogin.push(this.Login);
            localStorage.setItem('token', JSON.stringify(filterLogin));
            this.router.navigate(['dashboard']);
          } else {
            this.ModalWrong.open();
            console.log('Log In Failed');
          }
        },
        err => {
          console.log(err);
        });
    } else {
      this.ModalRequired.open();
    }

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
