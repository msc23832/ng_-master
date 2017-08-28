import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SendingcompleteService } from './sendingcomplete.service';

@Component({
  selector: 'app-sendingcomplete',
  templateUrl: './sendingcomplete.component.html',
  styleUrls: ['./sendingcomplete.component.css'],
  providers: [SendingcompleteService]
})
export class SendingcompleteComponent implements OnInit {

  private _EmailSending: Observable<any[]>;
  @ViewChild('myModal')
  modal: ModalComponent;
  private resend;
  private Filter;
  busy: Subscription;

  constructor(private router: Router, private SendingcompleteService: SendingcompleteService) {
    this.resend = {
      IDSendEmail: '',
      Email: '',
      User: '',
      IDEmailTemplate: ''
    };
  }

  onClickModal(ID, Email, Form) {
    this.modal.open();
    this.resend.IDSendEmail = ID;
    this.resend.Email = Email;
    this.resend.IDEmailTemplate = this.Filter[0].Template;
    console.log(this.Filter);
    if (localStorage.getItem('token')) {
      this.Filter = JSON.parse(localStorage.getItem('token'));
      this.resend.User = this.Filter[0].User;
    }
    console.log(this.resend);
  }

  onSendEmail() {
    this.SendingcompleteService.ResendEmail(this.resend).subscribe(
      data => {
        console.log('received response');
        console.log('Waiting For SendEmail');
        this.modal.close();
        this.getEmailSending();
      },
      err => {
        console.log(err);
      });


    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // this._http.post(`${environment.apiUrl}/api/SendEmail/resend`, JSON.stringify(this.resend), { headers: headers }).subscribe(function (data) {
    //   // login successful if there's a jwt token in the response
    //   console.log('received response');
    //   console.log('Waiting For SendEmail');
    //   //location.reload();
    // });
    // this.modal.close();
    // this.getEmailSending();
  }

  onBack() {
    localStorage.removeItem('Filter');
    this.router.navigate(['sending']);
  }

  getEmailSending() {
    this.busy = this.SendingcompleteService.getEmailSending().subscribe(
      data => {
        this._EmailSending = data;
        console.log(this._EmailSending);
      },
      err => {
        console.log(err);
      });
    // return this._http.get(`${environment.apiUrl}/api/SendEmail`)
    //   .subscribe(
    //   data => this._EmailSending = data.json(),
    //   err => this.logError(err),
    //   () => console.log()
    //   );
  }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  ngOnInit() {
    this.getEmailSending();
    if (localStorage.getItem('Filter')) {
      this.Filter = JSON.parse(localStorage.getItem('Filter'));
      console.log(this.Filter);
    }
  }

}
