import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';
import { NvD3Module } from 'ng2-nvd3';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigComponent } from './config-/config-.component';
import { InfoComponent } from './info/info.component';
import { SysemailComponent } from './sysemail/sysemail.component';
import { TemplateComponent } from './template/template.component';
import { UsersComponent } from './users/users.component';
import { SendingComponent } from './sending/sending.component';
import { ReportComponent } from './report/report.component';
import { NewusersComponent } from './newusers/newusers.component';
import { NewtemplateComponent } from './newtemplate/newtemplate.component';
import { NewsysemailComponent } from './newsysemail/newsysemail.component';
import { EditusersComponent } from './editusers/editusers.component';
import { EdittemplateComponent } from './edittemplate/edittemplate.component';
import { EditsysemailComponent } from './editsysemail/editsysemail.component';
import { PreviewtemplateComponent } from './previewtemplate/previewtemplate.component';
import { SendingtemplateComponent } from './sendingtemplate/sendingtemplate.component';
import { ReporttemplateComponent } from './reporttemplate/reporttemplate.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { HomeComponent } from './home/home.component';
import { SendingcompleteComponent } from './sendingcomplete/sendingcomplete.component';
import { EmailStatusComponent } from './email-status/email-status.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    ConfigComponent,
    InfoComponent,
    SysemailComponent,
    TemplateComponent,
    UsersComponent,
    SendingComponent,
    ReportComponent,
    NewusersComponent,
    NewtemplateComponent,
    NewsysemailComponent,
    EditusersComponent,
    EdittemplateComponent,
    EditsysemailComponent,
    PreviewtemplateComponent,
    SendingtemplateComponent,
    ReporttemplateComponent,
    LoginComponent,
    HomeComponent,
    SendingcompleteComponent,
    EmailStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2Bs3ModalModule,
    BrowserAnimationsModule,
    BusyModule,
    NvD3Module
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
