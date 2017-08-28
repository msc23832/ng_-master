import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { environment } from '../../environments/environment';
import { InfoService } from './info.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [InfoService]
})
export class InfoComponent implements OnInit {

  private HotelInfo;
  private AddHotelInfo;
  file: File;
  loaded: boolean = false;
  imageSrc: string = '';
  @ViewChild('insertModal')
  insertmodal: ModalComponent;
  @ViewChild('updateModal')
  updatemodal: ModalComponent;
  busy: Subscription;

  constructor(private InfoService: InfoService) {
    this.HotelInfo = [{
      Code: '',
      Name: '',
      Address: '',
      Logo: ''
    }];
    this.AddHotelInfo = {
      Code: '',
      Name: '',
      Address: '',
      Logo: ''
    };
  }

  modalUpdate() {
    this.updatemodal.open();
  }

  update() {
    console.log(this.HotelInfo[0]);
    this.InfoService.saveData(this.HotelInfo[0]).subscribe(
      data => {
        this.updatemodal.close();
        this.getAll();
      },
      err => {
        console.log(err);
      });
  }

  modalInsert() {
    this.insertmodal.open();
  }

  save() {
    this.InfoService.saveData(this.AddHotelInfo).subscribe(
      data => {
        this.insertmodal.close();
        this.getAll();
      },
      err => {
        console.log(err);
      });
  }

  getAll() {
    return this.InfoService.getData().subscribe(
      data => {
        this.HotelInfo = data;
      },
      err => {
        console.log(err);
      });
  }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  onChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    var reader = e.target;
    this.HotelInfo[0].Logo = reader.result;
  }

  onChangeSave(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.loaded = false;

    reader.onload = this._handleReaderLoadedSave.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoadedSave(e) {
    var reader = e.target;
    this.imageSrc = reader.result;
    this.AddHotelInfo.Logo = reader.result;
  }

  ngOnInit() {
    this.busy = this.getAll();
  }

}
