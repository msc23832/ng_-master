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
  @ViewChild('deleteModal')
  deletemodal: ModalComponent;
  @ViewChild('updateModal')
  updatemodal: ModalComponent;
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
    this.EditsysemailService.updateData(ID, this.data).subscribe(
      data => {
        this.updatemodal.close();
        this.router.navigate(['sysemail']);
      },
      err => {
        console.log(err);
      });

    // console.log('Update ID : ' + ID);
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // this._http.post(`${environment.apiUrl}/api/EditEmailSystem/${ID}/save`, JSON.stringify(this._data), { headers: headers }).subscribe(function (data) {
    //   // login successful if there's a jwt token in the response
    //   console.log('received response');
    //   console.log('Update Success!!');
    //   //location.reload();
    // });
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
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // this._http.post(`${environment.apiUrl}/api/EditEmailSystem/${ID}/delete`, JSON.stringify(this._data), { headers: headers }).subscribe(function (data) {
    //   // login successful if there's a jwt token in the response
    //   console.log('received response');
    //   console.log('Delete Success!!');
    //   //location.reload();
    // });
    //this.deletemodal.close();
  }

  getData(ID) {
    return this.EditsysemailService.getData(ID).subscribe(
      data => {
        this.data = data[0];
      },
      err => {
        console.log(err);
      });

    // return this._http.get(`${environment.apiUrl}/api/EditEmailSystem/${ID}`)
    //   .subscribe(
    //   data => this._data = data.json(),
    //   err => this.logError(err),
    //   () => console.log('Edit Email System : ' + ID)
    //   );
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
