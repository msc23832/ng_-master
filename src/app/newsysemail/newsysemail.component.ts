import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { environment } from '../../environments/environment';
import { NewsysemailService } from './newsysemail.service';

@Component({
  selector: 'app-newsysemail',
  templateUrl: './newsysemail.component.html',
  styleUrls: ['./newsysemail.component.css'],
  providers: [NewsysemailService]
})
export class NewsysemailComponent implements OnInit {

  private Syse;
  @ViewChild('myModal')
  modal: ModalComponent;
  @ViewChild('ModalDuplicate')
  ModalDuplicate: ModalComponent;
  @ViewChild('ModalRequired')
  ModalRequired: ModalComponent;
  private _checkdup;

  constructor(private router: Router, private NewsysemailService: NewsysemailService) {
    this.Syse = {
      Host: '',
      Port: '',
      Proxy: '',
      Detail: '',
      Email: '',
      Password: ''
    };
  }

  save() {
    if ((this.Syse.Host != '') && (this.Syse.Port != '') && (this.Syse.Proxy != '') && (this.Syse.Detail != '') && (this.Syse.Email != '') && (this.Syse.Password != '')) {
      this.NewsysemailService.getData(this.Syse).subscribe(
        data => {
          this._checkdup = data[0];
          if (this._checkdup == undefined) {
            this.NewsysemailService.insertData(this.Syse).subscribe(
              data => {
                this.modal.close();
                this.router.navigate(['sysemail']);
                console.log('SystemEmail Insert Success');
              },
              err => {
                console.log(err);
              });
          } else {
            console.log('duplicate');
            this.modal.close();
            this.ModalDuplicate.open();
          }
        },
        err => {
          console.log(err);
        });
    } else {
      console.log('please enter required');
      this.modal.close();
      this.ModalRequired.open();
    }
  }

  onBack() {
    this.router.navigate(['sysemail']);
  }

  ngOnInit() {
  }

}
