import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { environment } from '../../environments/environment';
import { EditusersService } from './editusers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editusers',
  templateUrl: './editusers.component.html',
  styleUrls: ['./editusers.component.css'],
  providers: [EditusersService]
})
export class EditusersComponent implements OnInit {

  private data;
  id: number;
  @ViewChild('deleteModal')
  deletemodal: ModalComponent;
  @ViewChild('updateModal')
  updatemodal: ModalComponent;
  @ViewChild('ModalRequired')
  ModalRequired: ModalComponent;
  busy: Subscription;

  constructor(private activate: ActivatedRoute, private router: Router, private EditusersService: EditusersService) {
    this.data = {
      Fullname: '',
      Group: '',
      IDUsers: '',
      Password: '',
      User: ''
    };
  }

  modalUpdate() {
    this.updatemodal.open();
  }

  save(ID) {
    if ((this.data.User != '') && (this.data.Password != '') && (this.data.Group != '')) {
      this.EditusersService.updateData(ID, this.data).subscribe(
        data => {
          console.log('success');
          this.updatemodal.close();
          this.router.navigate(['users']);
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

  delete(ID) {
    this.EditusersService.deleteData(ID).subscribe(
      data => {
        console.log('success');
        this.deletemodal.close();
        this.router.navigate(['users']);
      },
      err => {
        console.log(err);
      });
  }

  modalDelete() {
    this.deletemodal.open();
  }

  // delete(ID) {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   this._http.post(`${environment.apiUrl}/api/EditUsers/${ID}/delete`, JSON.stringify(this._data), {headers: headers}).subscribe(function(data) {
  //               // login successful if there's a jwt token in the response
  //     console.log('received response');
  //     console.log('Delete Success!!');

  //     //location.reload();
  //   });
  //   this.updatemodal.close();
  //   this.router.navigate(['users']);
  // }

  // getData(ID) {
  //   return this._http.get(`${environment.apiUrl}/api/EditUsers/` + ID)
  //   .subscribe(
  //     data => this._data = data.json(),
  //     err => this.logError(err),
  //     () => console.log('EditUsers : ' + ID)
  //   );
  // }

  getData(ID) {
    return this.EditusersService.getData(ID).subscribe(
      data => {
        this.data = data[0];
        console.log(this.data);
      },
      err => {
        console.log(err);
      });
  }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  onBack() {
    this.router.navigate(['users']);
  }

  ngOnInit() {
    this.activate.params.subscribe(params => {
      if (params['IDUsers']) {
        this.id = +params['IDUsers']; // (+) converts string 'id' to a number
        this.busy = this.getData(this.id);
      }
    });
  }

}
