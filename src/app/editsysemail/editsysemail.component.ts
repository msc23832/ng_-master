import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { environment } from '../../environments/environment';
import { EditsysemailService } from './editsysemail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editsysemail',
  templateUrl: './editsysemail.component.html',
  styleUrls: ['./editsysemail.component.css'],
  providers: [EditsysemailService]
})
export class EditsysemailComponent implements OnInit {

  private data;
  id: number;
  private _checkdup;
  @ViewChild('deleteModal')
  deletemodal: ModalComponent;
  @ViewChild('updateModal')
  updatemodal: ModalComponent;
  @ViewChild('ModalDuplicate')
  ModalDuplicate: ModalComponent;
  @ViewChild('ModalRequired')
  ModalRequired: ModalComponent;
  busy: Subscription;

  constructor(private activate: ActivatedRoute, private router: Router, private EditsysemailService: EditsysemailService) {
    this.data = {
      IDEmailSystem: '',
      Email: '',
      Password: '',
      Host: '',
      Port: '',
      Proxy: '',
      Detail: ''
    };
  }

  onBack() {
    this.router.navigate(['sysemail']);
  }

  modalUpdate() {
    this.updatemodal.open();
  }

  save(ID) {
    if ((this.data.Host != '') && (this.data.Port != '') && (this.data.Proxy != '') && (this.data.Detail != '') && (this.data.Email != '') && (this.data.Password != '')) {
      console.log(ID);
      console.log(this.data);
      this.EditsysemailService.getDuplicate(ID, this.data).subscribe(
        data => {
          this._checkdup = data[0];
          if (this._checkdup == undefined) {
            this.EditsysemailService.updateData(ID, this.data).subscribe(
              data => {
                this.updatemodal.close();
                this.router.navigate(['sysemail']);
              },
              err => {
                console.log(err);
              });
          } else {
            console.log('duplicate');
            this.updatemodal.close();
            this.ModalDuplicate.open();
          }
        },
        err => {
          console.log(err);
        });
    } else {
      console.log('please enter required');
      this.updatemodal.close();
      this.ModalRequired.open();
    }
  }

  modalDelete() {
    this.deletemodal.open();
  }

  delete(ID) {
    this.EditsysemailService.deleteData(ID).subscribe(
      data => {
        this.deletemodal.close();
        this.router.navigate(['sysemail']);
      },
      err => {
        console.log(err);
      });
  }

  getData(ID) {
    return this.EditsysemailService.getData(ID).subscribe(
      data => {
        this.data = data[0];
      },
      err => {
        console.log(err);
      });
  }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  ngOnInit() {
    this.activate.params.subscribe(params => {
      if (params['IDEmailSystem']) {
        this.id = +params['IDEmailSystem']; // (+) converts string 'id' to a number
        this.busy = this.getData(this.id);
      }
    });
  }

}
