import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { environment } from '../../environments/environment';
import { NewtemplateService } from './newtemplate.service';

@Component({
    selector: 'app-newtemplate',
    templateUrl: './newtemplate.component.html',
    styleUrls: ['./newtemplate.component.css'],
    providers: [NewtemplateService]
})
export class NewtemplateComponent implements OnInit {

    private _HotelInfo;
    private _data;
    private Template;
    @ViewChild('myModal')
    modal: ModalComponent;
    @ViewChild('ModalRequired')
    ModalRequired: ModalComponent;

    constructor(private route: ActivatedRoute, private router: Router, private NewtemplateService: NewtemplateService) {
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

    getHotel() {
        this.NewtemplateService.getHetol().subscribe(
            data => {
                this._HotelInfo = data;
            },
            err => {
                console.log(err);
            });
    }

    getSystem() {
        this.NewtemplateService.getSystem().subscribe(
            data => {
                this._data = data;
            },
            err => {
                console.log(err);
            });
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
        if ((this.Template.Code != '') && (this.Template.Name != '') && (this.Template.IDEmailSystem != '')) {
            this.NewtemplateService.insertData(this.Template).subscribe(
                data => {
                    this.modal.close();
                    this.router.navigate(['template']);
                    console.log('Email Template Insert Success');
                },
                err => {
                    console.log(err);
                });
        } else {
            console.log('please enter required');
            this.modal.close();
            this.ModalRequired.open();
        }
    }

    doAnythingWithFile() {
    }

    ngOnInit() {
        this.getHotel();
        this.getSystem();
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
            this.Template.ImgFooter4 = e.target["result"];
          };
        reader.readAsDataURL(e.target.files[0]);
    }
}
