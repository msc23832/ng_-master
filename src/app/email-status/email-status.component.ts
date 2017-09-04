import { Component, OnInit, OnDestroy,Renderer } from '@angular/core';
import { Task } from '../task/task.module';
import { SendUpdateService } from './send-update.service';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-status',
  templateUrl: './email-status.component.html',
  styleUrls: ['./email-status.component.css'],
  providers:[SendUpdateService]
})
export class EmailStatusComponent implements OnInit {
  allTask: Task[] = [];
  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;
  constructor(private _data: SendUpdateService, private _router: Router) { }


  ngOnInit() {
    this.refreshData();
  }

  public ngOnDestroy(): void {
    if (this.postsSubscription) {
        this.postsSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
    }
}
private subscribeToData(): void {

this.timerSubscription=Observable.timer(5000)
.subscribe(()=>this.refreshData());
}
private refreshData():void{
this.postsSubscription= this._data.getupdate().subscribe(

  (data:Task[])=>{
    this.allTask=data;
    this.subscribeToData();
  },
  function(error){
    console.log(error);
  },
  function(){
    //console.log("complete");
  }
);
}

}
