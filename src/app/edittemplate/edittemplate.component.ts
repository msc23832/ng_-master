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

  private _HotelInfo: Observable<any[]>;
  private _dataTemplate;
  private _data: Observable<any[]>;
  id: number;
  private Template;
  file: File;
  @ViewChild('deleteModal')
  deletemodal: ModalComponent;
  @ViewChild('updateModal')
  updatemodal: ModalComponent;
  busy: Subscription;

  constructor(private _http: Http, private route: ActivatedRoute, private router: Router) {

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
    this.setTemplate();
    console.log(this.Template);
    //console.log(this._dataTemplate);
    console.log('Update IDEmailTemplate : ' + ID);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this._http.post(`${environment.apiUrl}/api/EditEmailTemplate/${ID}/save`, JSON.stringify(this.Template), { headers: headers }).subscribe(function (data) {
      // login successful if there's a jwt token in the response
      console.log('received response');
      console.log('Update Success!!');

    });
    this.updatemodal.close();
    this.router.navigate(['template']);
  }

  delete(ID) {
    console.log('Delete IDEmailTemplate : ' + ID);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this._http.post(`${environment.apiUrl}/api/EditEmailTemplate/${ID}/delete`, JSON.stringify(this._dataTemplate), { headers: headers }).subscribe(function (data) {
      console.log('received response');
      console.log('Delete Success!!');

    });
    this.deletemodal.close();
    this.router.navigate(['template']);
  }

  getHotelInfo() {
    return this._http.get(`${environment.apiUrl}/api/HotelInformation`)
      .subscribe(
      data => this._HotelInfo = data.json(),
      err => this.logError(err),
      () => console.log('GetHotel')
      );
  }

  getSystem() {
    return this._http.get(`${environment.apiUrl}/api/EmailSystem`)
      .subscribe(
      data => this._data = data.json(),
      err => this.logError(err),
      () => console.log('GetSystem')
      );
  }

  getData(ID) {
    return this._http.get(`${environment.apiUrl}/api/EditEmailTemplate/${ID}`)
      .subscribe(
      data => this._dataTemplate = data.json(),
      err => this.logError(err),
      () => console.log('EditEmailTemplate : ' + ID)
      );
  }

  setTemplate() {
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
      this.busy = this.getHotelInfo();
      this.busy = this.getSystem();
      this.busy = this.getData(this.id);
      console.log(this.Template);
    });

  }

  onChange(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader1 = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        //this.loaded1 = false;

        reader1.onload = this._handleReaderLoaded1.bind(this);
        reader1.readAsDataURL(file);

        console.log(file);

        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // this._http.post(`${environment.imageUrl}/sample_website/image/UploadImage.php`, file, {headers: headers}).subscribe(function(data) {
        //   console.log(data);
        //   console.log('Upload Image Body 1 Success');
        // });
  }

  // onChange(event: any) {
  //   let fileList: FileList = event.target.files;
  //   if (fileList.length > 0) {
  //     let file: File = fileList[0];
  //     let formData: FormData = new FormData();
  //     formData.append('degree_attachment', file, file.name);

  //     console.log(formData);
  //     let headers = new Headers();
  //     headers.append('Accept', 'application/json');
  //     let options = new RequestOptions({ headers: headers });
  //     this._http.post(`${environment.imageUrl}/sample_website/image/UploadImage.php`, file, options)
  //       .map(res => res.json())
  //       .catch(error => Observable.throw(error))
  //       .subscribe(
  //       data => console.log(data),
  //       error => console.log(error)
  //       );
  //   }
  // }

  _handleReaderLoaded1(e) {
    var reader1 = e.target;
    var binaryString = e.target.result;
    this.Template.Img1 = reader1.result;//btoa(binaryString);
    //console.log(reader1);

    var binaryString = e.target.result;
    var base64textString = btoa(binaryString);
    //console.log(base64textString);

    //this.Template.Img1 = reader1.result;

    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // this._http.post(`${environment.apiUrl}/api/EditEmailTemplate/${this.id}/upload1`, JSON.stringify(this.Template), {headers: headers}).subscribe(function(data) {
    //   console.log('received response');
    //   console.log('Upload Image Topics Success');
    // });
  }

  onChange2(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader2 = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    //this.loaded2 = false;

    reader2.onload = this._handleReaderLoaded2.bind(this);
    reader2.readAsDataURL(file);
  }

  _handleReaderLoaded2(e) {
    var reader2 = e.target;
    this.Template.Img2 = reader2.result;
    // = reader2.result;
  }

  onChange3(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader3 = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader3.onload = this._handleReaderLoaded3.bind(this);
    reader3.readAsDataURL(file);

    console.log(this.Template);
  }

  _handleReaderLoaded3(e) {
    var reader3 = e.target;
    this.Template.Img3 = reader3.result;
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // this._http.post(`${environment.apiUrl}/api/EditEmailTemplate/${this.id}/upload3`, JSON.stringify(this.Template), {headers: headers}).subscribe(function(data) {
    //   console.log('received response');
    //   console.log('Upload Image Body 2 Success');
    // });
  }

  onChange4(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader4 = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader4.onload = this._handleReaderLoaded4.bind(this);
    reader4.readAsDataURL(file);
  }

  _handleReaderLoaded4(e) {
    var reader4 = e.target;
    this.Template.Img4 = reader4.result;
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // this._http.post(`${environment.apiUrl}/api/EditEmailTemplate/${this.id}/upload4`, JSON.stringify(this.Template), {headers: headers}).subscribe(function(data) {
    //   console.log('received response');
    //   console.log('Upload Image Body 3 Success');
    // });
  }

  onChange5(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader5 = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader5.onload = this._handleReaderLoaded5.bind(this);
    reader5.readAsDataURL(file);
  }

  _handleReaderLoaded5(e) {
    var reader5 = e.target;
    this.Template.Img5 = reader5.result;
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // this._http.post(`${environment.apiUrl}/api/EditEmailTemplate/${this.id}/upload5`, JSON.stringify(this.Template), {headers: headers}).subscribe(function(data) {
    //   console.log('received response');
    //   console.log('Upload Image Body 4 Success');
    // });
  }

  onChangeFoot1(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = this._handleReaderLoadedFoot1.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoadedFoot1(e) {
    var reader = e.target;
    this.Template.ImgFooter1 = reader.result;
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // this._http.post(`${environment.apiUrl}/api/EditEmailTemplate/${this.id}/uploadFoot1`, JSON.stringify(this.Template), {headers: headers}).subscribe(function(data) {
    //   console.log('received response');
    //   console.log('Upload Image Footer 1 Success');
    // });
  }

  onChangeFoot2(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = this._handleReaderLoadedFoot2.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoadedFoot2(e) {
    var reader = e.target;
    this.Template.ImgFooter2 = reader.result;
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // this._http.post(`${environment.apiUrl}/api/EditEmailTemplate/${this.id}/uploadFoot2`, JSON.stringify(this.Template), {headers: headers}).subscribe(function(data) {
    //   console.log('received response');
    //   console.log('Upload Image Footer 2 Success');
    // });
  }

  onChangeFoot3(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = this._handleReaderLoadedFoot3.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoadedFoot3(e) {
    var reader = e.target;
    this.Template.ImgFooter3 = reader.result;
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // this._http.post(`${environment.apiUrl}/api/EditEmailTemplate/${this.id}/uploadFoot3`, JSON.stringify(this.Template), {headers: headers}).subscribe(function(data) {
    //   console.log('received response');
    //   console.log('Upload Image Footer 3 Success');
    // });
  }

  onChangeFoot4(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = this._handleReaderLoadedFoot4.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoadedFoot4(e) {
    var reader = e.target;
    this.Template.ImgFooter4 = reader.result;
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // this._http.post(`${environment.apiUrl}/api/EditEmailTemplate/${this.id}/uploadFoot4`, JSON.stringify(this.Template), {headers: headers}).subscribe(function(data) {
    //   console.log('received response');
    //   console.log('Upload Image Footer 4 Success');
    // });
  }

}
