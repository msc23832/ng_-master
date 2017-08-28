import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-newtemplate',
  templateUrl: './newtemplate.component.html',
  styleUrls: ['./newtemplate.component.css']
})
export class NewtemplateComponent implements OnInit {

  private _HotelInfo: Observable<any[]>;
  private _data: Observable<any[]>;
  private Template;
  file: File;
  @ViewChild('myModal')
  modal: ModalComponent;

  loaded1: boolean = false;
  imageSrc1: string = '';
  loaded2: boolean = false;
  imageSrc2: string = '';
  loaded3: boolean = false;
  imageSrc3: string = '';
  loaded4: boolean = false;
  imageSrc4: string = '';
  loaded5: boolean = false;
  imageSrc5: string = '';

  loadedFoot1: boolean = false;
  imageSrcFoot1: string = '';
  loadedFoot2: boolean = false;
  imageSrcFoot2: string = '';
  loadedFoot3: boolean = false;
  imageSrcFoot3: string = '';
  loadedFoot4: boolean = false;
  imageSrcFoot4: string = '';

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

  getTemplate() {
    return this._http.get(`${environment.apiUrl}/api/HotelInformation`)
    .subscribe(
      data => this._HotelInfo = data.json(),
      err => this.logError(err),
      () => console.log(this._HotelInfo)
    );
  }

  getSystem() {
    return this._http.get(`${environment.apiUrl}/api/NewEmailTemplate/System`)
    .subscribe(
      data => this._data = data.json(),
      err => this.logError(err),
      () => console.log('GetSystem')
    );
  }

  logError(err: string) {
    console.error('There was an error: ' + err);
  }

  onBack() {
    this.router.navigate(['template']);
  }

  save() {
    this.Template.Logo = this._HotelInfo[0].Logo;
    this.Template.Address = this._HotelInfo[0].Address;
    console.log(this.Template);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this._http.post(`${environment.apiUrl}/api/NewEmailTemplate/save`, JSON.stringify(this.Template), {headers: headers}).subscribe(function(data) {
                // login successful if there's a jwt token in the response
      console.log('received response');
      console.log('Email Template Insert Success');
      
      //location.reload();
    });
    this.modal.close();
    this.router.navigate(['template']);
    
  }

  doAnythingWithFile() {
  }

  ngOnInit() {
    this.getTemplate();
    this.getSystem();
  }

    onChange(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader1 = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.loaded1 = false;

        reader1.onload = this._handleReaderLoaded1.bind(this);
        reader1.readAsDataURL(file);
    }
    
    _handleReaderLoaded1(e) {
        var reader1 = e.target;
        this.imageSrc1 = reader1.result;
        this.Template.Img1 = reader1.result;
        //this.loaded1 = true;
    }


    onChange2(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader2 = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.loaded2 = false;

        reader2.onload = this._handleReaderLoaded2.bind(this);
        reader2.readAsDataURL(file);
    }

    _handleReaderLoaded2(e) {
        var reader2 = e.target;
        this.imageSrc2 = reader2.result;
        this.Template.Img2 = reader2.result;
    }

    onChange3(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader3 = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.loaded3 = false;

        reader3.onload = this._handleReaderLoaded3.bind(this);
        reader3.readAsDataURL(file);
    }

    _handleReaderLoaded3(e) {
        var reader3 = e.target;
        this.imageSrc3 = reader3.result;
        this.Template.Img3 = reader3.result;
    }

    onChange4(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader4 = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.loaded4 = false;

        reader4.onload = this._handleReaderLoaded4.bind(this);
        reader4.readAsDataURL(file);
    }

    _handleReaderLoaded4(e) {
        var reader4 = e.target;
        this.imageSrc4 = reader4.result;
        this.Template.Img4 = reader4.result;
    }

    onChange5(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader5 = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.loaded5 = false;

        reader5.onload = this._handleReaderLoaded5.bind(this);
        reader5.readAsDataURL(file);
    }

    _handleReaderLoaded5(e) {
        var reader5 = e.target;
        this.imageSrc5 = reader5.result;
        this.Template.Img5 = reader5.result;
    }

    onChangeFoot1(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.loadedFoot1 = false;

        reader.onload = this._handleReaderLoadedFoot1.bind(this);
        reader.readAsDataURL(file);
    }

    _handleReaderLoadedFoot1(e) {
        var reader = e.target;
        this.imageSrcFoot1 = reader.result;
        this.Template.ImgFooter1 = reader.result;
    }

    onChangeFoot2(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.loadedFoot2 = false;

        reader.onload = this._handleReaderLoadedFoot2.bind(this);
        reader.readAsDataURL(file);
    }

    _handleReaderLoadedFoot2(e) {
        var reader = e.target;
        this.imageSrcFoot2 = reader.result;
        this.Template.ImgFooter2 = reader.result;
    }

    onChangeFoot3(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.loadedFoot3 = false;

        reader.onload = this._handleReaderLoadedFoot3.bind(this);
        reader.readAsDataURL(file);
    }

    _handleReaderLoadedFoot3(e) {
        var reader = e.target;
        this.imageSrcFoot3 = reader.result;
        this.Template.ImgFooter3 = reader.result;
    }

    onChangeFoot4(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.loadedFoot4 = false;

        reader.onload = this._handleReaderLoadedFoot4.bind(this);
        reader.readAsDataURL(file);
    }

    _handleReaderLoadedFoot4(e) {
        var reader = e.target;
        this.imageSrcFoot4 = reader.result;
        this.Template.ImgFooter4 = reader.result;
    }
}
