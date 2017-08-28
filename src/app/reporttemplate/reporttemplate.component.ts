import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reporttemplate',
  templateUrl: './reporttemplate.component.html',
  styleUrls: ['./reporttemplate.component.css']
})
export class ReporttemplateComponent implements OnInit {

  private Filter;
  private resend;
  private User;
  private _EmailSending: Observable<any[]>;
  busy: Subscription;
  @ViewChild('myModal')
  modal: ModalComponent;

  constructor(private _http: Http, private router: Router) {
    this.Filter = {
      Template: '',
      DateArr: '',
      DateDep: '',
      marketsec: '',
      rateplan: '',
      status: '',
      floor: '',
      preference: '',
      user: ''
    };

    this.resend = {
      IDSendEmail: '',
      Email: '',
      User: '',
      IDEmailTemplate: ''
    };
  }

  sendFilter() {
    console.log(JSON.stringify(this.Filter[0]));
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(`${environment.apiUrl}/api/Report/`, JSON.stringify(this.Filter[0]), { headers: headers }).subscribe(
      data => this._EmailSending = data.json(),
      err => this.logError(err),
      () => console.log(this._EmailSending)
    );
  }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  onExport() {
    var csvData = this.ConvertToCSV(this._EmailSending);
                        var a = document.createElement("a");
                        a.setAttribute('style', 'display:none;');
                        document.body.appendChild(a);
                        var blob = new Blob([csvData], { type: 'text/csv' });
                        var url= window.URL.createObjectURL(blob);
                        a.href = url;
                        a.download = 'Export.csv';/* your file name*/
                        a.click();
                        return 'success';
  }

  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }

  onClickModal(ID, Email, Form) {
    this.modal.open();
    this.resend.IDSendEmail = ID;
    this.resend.Email = Email;
    this.resend.IDEmailTemplate = this.Filter[0].Template;
    console.log(this.Filter);
    if (localStorage.getItem('token')) {
      this.User = JSON.parse(localStorage.getItem('token'));
      this.resend.User = this.User[0].User;
    }
    console.log(this.resend);
  }

  onSendEmail() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this._http.post(`${environment.apiUrl}/api/SendEmail/resend`, JSON.stringify(this.resend), { headers: headers }).subscribe(function (data) {
      // login successful if there's a jwt token in the response
      console.log('received response');
      console.log('Waiting For SendEmail');
      //location.reload();
    });
    this.modal.close();
    this.sendFilter();
  }

  onBack() {
    localStorage.removeItem('FilterReport');
    this.router.navigate(['report']);
  }

  ngOnInit() {
    if (localStorage.getItem('FilterReport')) {
      this.Filter = JSON.parse(localStorage.getItem('FilterReport'));
      this.busy = this.sendFilter();
    }
  }

}
