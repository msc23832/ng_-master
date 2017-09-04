import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { DashboardComponent } from '../dashboard/dashboard.component'
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  entryComponents:[MenuComponent,DashboardComponent]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private http: Http) { }
      
  ngOnInit() {
    // if (localStorage.getItem('token')){
    //   this.router.navigate(['dashboard']);      
    // }
  }

}
