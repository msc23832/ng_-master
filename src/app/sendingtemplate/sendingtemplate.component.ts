import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Subscription } from 'rxjs';
import { SendingtemplateService } from './sendingtemplate.service';

@Component({
  selector: 'app-sendingtemplate',
  templateUrl: './sendingtemplate.component.html',
  styleUrls: ['./sendingtemplate.component.css'],
  providers: [SendingtemplateService]
})
export class SendingtemplateComponent implements OnInit {

  private Filter;
  private EmailSend;
  private _Template;
  @ViewChild('myModal')
  modal: ModalComponent;
  busy: Subscription;

  constructor(private router: Router, private SendingtemplateService: SendingtemplateService) {
    this.Filter = {
      Template: '',
      DateArr: '',
      DateDep: '',
      marketsec: '',
      rateplan: '',
      status: '',
      floor: '',
      preference: '',
      User: ''
    };
    this.EmailSend = [{
      // Check: '',
      // firstname: '',
      // arrival:'',
      // departure:'',
      // Room: '',
      // Email: '',
      // Form: '',
      // marketsec: '',
      // Rate: '',
      // Date: Date.now(),
    }];
  }

  isAllChecked() {
    return this.EmailSend.every(_ => _.state);
  }

  checkAll(ev) {
    this.EmailSend.forEach(x => x.state = ev.target.checked);
  }

  onSendEmail() {
    var i = 0;
    for (var key in this.EmailSend) {
      if (this.EmailSend[i].state == true) {
        this.EmailSend[i].User = this.Filter[0].User;
        this.EmailSend[i].Template = this.Filter[0].Template;
        console.log(this.EmailSend[i]);

        this.SendingtemplateService.SendEmail(this.EmailSend[i]).subscribe(
          data => {
            console.log('received response');
            console.log('Waiting For SendEmail');
          },
          err => {
            console.log(err);
          });
        
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // this._http.post(`${environment.apiUrl}/api/SendEmail/send`, JSON.stringify(this.EmailSend[i]), { headers: headers }).subscribe(function (data) {
        //   // login successful if there's a jwt token in the response
        //   console.log('received response');
        //   console.log('Waiting For SendEmail');
        //   //location.reload();
        // });
      }
      i++;
    }
    //localStorage.removeItem('Filter');
    this.modal.close();
    this.router.navigate(['sendingcomplete']);
  }

  getArnoma() {
    this.busy = this.SendingtemplateService.GetArnoma(this.Filter[0]).subscribe(
      data => {
        this.EmailSend = data;
        console.log(this.EmailSend);
      },
      err => {
        console.log(err);
      });

    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // return this._http.post(`${environment.apiUrl}/api/SendEmail/getArnoma`, JSON.stringify(this.Filter[0]), { headers: headers }).subscribe(
    //   data => this.EmailSend = data.json(),
    //   err => this.logError(err),
    //   () => console.log(this.EmailSend)
    // );
  }

  // getTemplate() {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   return this._http.post(`${environment.apiUrl}/api/SendEmail/getTemplate`, JSON.stringify(this.Filter[0]), { headers: headers })
  //     .subscribe(
  //     data => this._Template = data.json(),
  //     err => this.logError(err),
  //     () => console.log('HTML')
  //     );
  // }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  onBack() {
    localStorage.removeItem('Filter');
    this.router.navigate(['sending']);
  }

  ngOnInit() {
    if (localStorage.getItem('Filter')) {
      this.Filter = JSON.parse(localStorage.getItem('Filter'));
      //this.busy = this.getTemplate();
      this.getArnoma();
      console.log(this.Filter);
    }
  }

}
