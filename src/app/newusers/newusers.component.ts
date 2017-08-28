import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { environment } from '../../environments/environment';
import { NewusersService } from './newusers.service';

@Component({
  selector: 'app-newusers',
  templateUrl: './newusers.component.html',
  styleUrls: ['./newusers.component.css'],
  providers: [NewusersService]
})
export class NewusersComponent implements OnInit {

  private Users;
  @ViewChild('myModal')
  modal: ModalComponent;
  private _data: Observable<any[]>;

  constructor(private router: Router, private NewusersService: NewusersService) {
    this.Users = {
      user: '',
      password: '',
      fullname: '',
      group: ''
    };
  }

  save() {
    console.log(this.Users);
    this.NewusersService.insertData(this.Users).subscribe(
      data => {
        this.modal.close();
        this.router.navigate(['users']);
        console.log('Users Insert Success');
      },
      err => {
        console.log(err);
      });
  }

  onBack() {
    this.router.navigate(['users']);
  }

  ngOnInit() {
  }
  
  logError(err: string) {
    console.error('There was an error: ' + err);
  }

}
