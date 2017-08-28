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
    this.NewsysemailService.insertData(this.Syse).subscribe(
      data => {
        this.modal.close();
        this.router.navigate(['sysemail']);
        console.log('SystemEmail Insert Success');
      },
      err => {
        console.log(err);
      });
  }

  onBack() {
    this.router.navigate(['sysemail']);
  }

  ngOnInit() {
  }

}
