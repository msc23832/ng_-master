import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './config-/config-.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { EditsysemailService } from './editsysemail/editsysemail.service';
import { ReporttemplateComponent } from './reporttemplate/reporttemplate.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { HomeComponent } from './home/home.component';
import { SendingcompleteComponent } from './sendingcomplete/sendingcomplete.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent , canActivate: [LoginService],
    children: [
      { path: 'config-', component: ConfigComponent  },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sending', component: SendingComponent  },
      { path: 'report', component: ReportComponent },
      { path: 'info', component: InfoComponent  },
      { path: 'sysemail', component: SysemailComponent  },
      { path: 'template', component: TemplateComponent  },
      { path: 'users', component: UsersComponent  },
      { path: 'newusers', component: NewusersComponent  },
      { path: 'newtemplate', component: NewtemplateComponent},
      { path: 'newsysemail', component: NewsysemailComponent },
      { path: 'editusers/:IDUsers', component: EditusersComponent  },
      { path: 'edittemplate/:IDEmailTemplate', component: EdittemplateComponent  },
      { path: 'editsysemail/:IDEmailSystem', component: EditsysemailComponent  },
      { path: 'previewtemplate/:IDEmailTemplate', component: PreviewtemplateComponent  },
      { path: 'sendingtemplate', component: SendingtemplateComponent },
      { path: 'reporttemplate', component: ReporttemplateComponent },
      { path: 'sendingcomplete', component: SendingcompleteComponent },
    ]
  },
  // เมื่อเข้าถึง /pages
  // ให้นำ PageListComponent ไปแสดงผลใน RouterOutlet ของ AppComponent
  { path: 'login', component: LoginComponent },
  // { path: '', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
