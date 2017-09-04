import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { EdittemplateService } from './edittemplate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edittemplate',
  templateUrl: './edittemplate.component.html',
  styleUrls: ['./edittemplate.component.css'],
  providers: [EdittemplateService]
})
export class EdittemplateComponent implements OnInit {

  private _HotelInfo;
  private _dataTemplate;
  private _data;
  id: number;
  private Template;
  file: File;
  @ViewChild('deleteModal')
  deletemodal: ModalComponent;
  @ViewChild('updateModal')
  updatemodal: ModalComponent;
  @ViewChild('ModalRequired')
  ModalRequired: ModalComponent;
  busy: Subscription;

  constructor(private _http: Http, private route: ActivatedRoute, private router: Router, private EdittemplateService: EdittemplateService) {

    this.Template = {
      Logo: '',
      Address: '',
      Code: '',
      Name: '',
      Topics: '',
      Message1: '',
      Message2: '',
      IDEmailSystem: '',
      Img1: '',
      Img2: '',
      Img3: '',
      Img4: '',
      Img5: '',
      ImgFooter1: '',
      ImgFooter2: '',
      ImgFooter3: '',
      ImgFooter4: '',
      LinkImg1: '',
      LinkImg2: '',
      LinkImg3: '',
      LinkImg4: '',
      LinkImg5: '',
      LinkImgFoot1: '',
      LinkImgFoot2: '',
      LinkImgFoot3: '',
      LinkImgFoot4: ''
    };
  }

  modalUpdate() {
    this.updatemodal.open();
  }

  modalDelete() {
    this.deletemodal.open();
  }

  save(ID) {
    this.setDefaultTemplate();
    console.log(this.Template);
    if ((this.Template.Code != '') && (this.Template.Name != '') && (this.Template.IDEmailSystem != '')) {
      this.EdittemplateService.updateData(ID, this.Template).subscribe(
        data => {
          console.log('success');
          this.updatemodal.close();
          this.router.navigate(['template']);
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
    this.EdittemplateService.deleteData(ID).subscribe(
      data => {
        console.log('success');
        this.deletemodal.close();
        this.router.navigate(['template']);
      },
      err => {
        console.log(err);
      });
  }

  getHotelInfo() {
    this.EdittemplateService.getHotelInfo().subscribe(
      data => {
          this._HotelInfo = data;
      },
      err => {
          console.log(err);
      });
  }

  getSystem() {
    this.EdittemplateService.getSystem().subscribe(
      data => {
          this._data = data;
      },
      err => {
          console.log(err);
      });
  }

  getData(ID) {
    this.EdittemplateService.getData(ID).subscribe(
      data => {
          this._dataTemplate = data;
      },
      err => {
          console.log(err);
      });
  }

  setDefaultTemplate() {
    this.Template.Logo = this._HotelInfo[0].Logo;
    this.Template.Address = this._HotelInfo[0].Address;
    this.Template.Code = this._dataTemplate[0].Code;
    this.Template.Name = this._dataTemplate[0].Name;
    this.Template.Topics = this._dataTemplate[0].Topics;
    this.Template.Message1 = this._dataTemplate[0].Message1;
    this.Template.Message2 = this._dataTemplate[0].Message2;
    this.Template.IDEmailSystem = this._dataTemplate[0].IDEmailSystem;
    this.Template.LinkImg1 = this._dataTemplate[0].LinkImg1;
    this.Template.LinkImg2 = this._dataTemplate[0].LinkImg2;
    this.Template.LinkImg3 = this._dataTemplate[0].LinkImg3;
    this.Template.LinkImg4 = this._dataTemplate[0].LinkImg4;
    this.Template.LinkImg5 = this._dataTemplate[0].LinkImg5;
    this.Template.LinkImgFoot1 = this._dataTemplate[0].LinkImgFoot1;
    this.Template.LinkImgFoot2 = this._dataTemplate[0].LinkImgFoot2;
    this.Template.LinkImgFoot3 = this._dataTemplate[0].LinkImgFoot3;
    this.Template.LinkImgFoot4 = this._dataTemplate[0].LinkImgFoot4;


    if (this.Template.Img1 == "")
      this.Template.Img1 = this._dataTemplate[0].Img1;
    if (this.Template.Img2 == "")
      this.Template.Img2 = this._dataTemplate[0].Img2;
    if (this.Template.Img3 == "")
      this.Template.Img3 = this._dataTemplate[0].Img3;
    if (this.Template.Img4 == "")
      this.Template.Img4 = this._dataTemplate[0].Img4;
    if (this.Template.Img5 == "")
      this.Template.Img5 = this._dataTemplate[0].Img5;
    if (this.Template.ImgFooter1 == "")
      this.Template.ImgFooter1 = this._dataTemplate[0].ImgFooter1;
    if (this.Template.ImgFooter2 == "")
      this.Template.ImgFooter2 = this._dataTemplate[0].ImgFooter2;
    if (this.Template.ImgFooter3 == "")
      this.Template.ImgFooter3 = this._dataTemplate[0].ImgFooter3;
    if (this.Template.ImgFooter4 == "")
      this.Template.ImgFooter4 = this._dataTemplate[0].ImgFooter4;
  }


  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  onBack() {
    this.router.navigate(['template']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['IDEmailTemplate']; // (+) converts string 'id' to a number
      this.getHotelInfo();
      this.getSystem();
      this.getData(this.id);
      console.log(this.Template);
    });

  }

  onChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = (e) => {
      this._dataTemplate[0].Img1 = e.target["result"];
      this.Template.Img1 = e.target["result"];
    };
    reader.readAsDataURL(e.target.files[0]);
  }


  onChange2(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = (e) => {
      this._dataTemplate[0].Img2 = e.target["result"];
      this.Template.Img2 = e.target["result"];
    };
    reader.readAsDataURL(e.target.files[0]);
  }


  onChange3(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = (e) => {
      this._dataTemplate[0].Img3 = e.target["result"];
      this.Template.Img3 = e.target["result"];
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  onChange4(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = (e) => {
      this._dataTemplate[0].Img4 = e.target["result"];
      this.Template.Img4 = e.target["result"];
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  onChange5(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = (e) => {
      this._dataTemplate[0].Img5 = e.target["result"];
      this.Template.Img5 = e.target["result"];
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  onChangeFoot1(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = (e) => {
      this._dataTemplate[0].ImgFooter1 = e.target["result"];
      this.Template.ImgFooter1 = e.target["result"];
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  onChangeFoot2(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = (e) => {
      this._dataTemplate[0].ImgFooter2 = e.target["result"];
      this.Template.ImgFooter2 = e.target["result"];
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  onChangeFoot3(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = (e) => {
      this._dataTemplate[0].ImgFooter3 = e.target["result"];
      this.Template.ImgFooter3 = e.target["result"];
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  onChangeFoot4(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = (e) => {
      this._dataTemplate[0].ImgFooter4 = e.target["result"];
      this.Template.ImgFooter4 = e.target["result"];
    };
    reader.readAsDataURL(e.target.files[0]);
  }

}
