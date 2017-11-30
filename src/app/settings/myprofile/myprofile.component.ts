import { Component, ViewChild, OnInit, OnChanges } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RedBenchService } from '../../Service/RedBenchService';
import { Organization, OrganizationResult } from '../../Model/organization';
import { Emp, EmpResult } from '../../Model/emp';
import { Observable } from 'rxjs/RX';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { environment } from '../../../environments/environment';
declare var google: any;
@Component({
  templateUrl: 'myprofile.component.html'
})
export class MyprofileComponent implements OnInit {

  isLoading: boolean = false;
  data: any;

  cropperSettings: CropperSettings;
  public myForm: FormGroup;
  isEdit: boolean = false;
  resultorg: OrganizationResult;
  private id: string;
  private url: any;
  private type: any;
  private firstletter: string;
  private profile: OrganizationResult[] = [];
  private imgstr: any;
  private imagesrc: any;
  private event: any;
  croppedWidth: number;
  croppedHeight: number;
  public zipMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public phoneMask = ['+', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  resultemp: EmpResult;
  private modelLo: any;
  private modelrem = new EmpResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  constructor(private http: Http, private RedBenchService: RedBenchService, private _fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.data = {};

  }
  fileChangeListener($event) {

    this.event = $event;
    console.log(this.event);
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

  cropped(bounds: Bounds) {
    this.croppedHeight = 200;
    this.croppedWidth = 200;
  }
  ngOnInit() {

    this.modelLo = JSON.parse(localStorage.getItem('currentUser'));
    this.type = this.modelLo.Type;
    this.id = this.modelLo.Id;
    this.id = this.modelLo.Id;
    this.GetempsById(this.id);

    this.myForm = this._fb.group({
      // 'firstName': [this.modelrem.FirstName,Validators.required],
      // 'lastName': [this.modelrem.LastName,Validators.required],
      // 'email': [this.modelrem.Email,Validators.required],
      'gender': ['', Validators.required],
      'phone': ['', Validators.required],
      'address': ['', Validators.required],
      'city': ['', Validators.required],
      'state': ['', Validators.required],
      'zipcode': ['', Validators.required]
    });
  }

  iseditFalse() {
    this.isEdit = false;
  }
  iseditTrue() {
    this.isEdit = true;
  }
  GetempsById(id) {

    this.RedBenchService.GetempsById(id).subscribe(
      results => {

        this.modelrem = results;
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(this.modelrem))
        if (this.modelrem.ProfilePic == null) {
          this.imgstr = "../../assets/img/profile-icon.png"
        }
        else if (this.modelrem.ProfilePic == '') {
          this.imgstr = "../../assets/img/profile-icon.png"
        }
        else {
          this.imgstr = this.modelrem.ProfilePic;
        }

        this.myForm = this._fb.group({
          // 'firstName': [this.modelrem.FirstName],
          // 'lastName': [this.modelrem.LastName],
          // 'email': [this.modelrem.Email],
          'gender': [this.modelrem.Gender, Validators.required],
          'phone': [this.modelrem.ContactNumber, Validators.required],
          'address': [this.modelrem.Address, Validators.required],
          'city': [this.modelrem.City, Validators.required],
          'state': [this.modelrem.State, Validators.required],
          'zipcode': [this.modelrem.Zipcode, Validators.required]
        });

      },
      error => {

      });
  }

  public City: Object;
  getCity(place: Object) {
    this.City = place['name'];
    console.log("City Object", place['name']);
  }



  update() {

    this.isLoading = true;
    if (this.City != undefined)
      this.modelrem.City = this.City;
    if (this.modelrem.ProfilePic == null && this.event == undefined) {
      this.imgstr = "../../assets/img/avatars/user-icon.jpg"
    }
    if (this.modelrem.ProfilePic == '' && this.event == undefined) {
      this.imgstr = "../../assets/img/avatars/user-icon.jpg"
    }
    else if (this.event == undefined && this.modelrem.ProfilePic != null) {
      this.imgstr = this.modelrem.ProfilePic;

    }
    else {
      this.modelrem.ProfilePic = this.croppedImage;
    }

    this.modelrem.Gender = this.myForm.value.gender;
    let commentOperation: Observable<EmpResult>;
    commentOperation = this.RedBenchService.updateEmp(this.id, this.modelrem)
    commentOperation.subscribe(
      results => {

        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(this.modelrem));
        console.log(this.modelrem);
        this.GetempsById(this.modelrem.Id);
        this.router.navigate(['/settings/myprofile']);
        location.reload();
        this.isEdit = false;
      },
      err => {

        this.isLoading = false;
      });


  }
  fileChange(data) {

    var event = this.event;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', data.image, '');
      console.log(file);
      let trimdata = /,(.+)/.exec(data.image)[1];
      let Img = {
        "imgstr": trimdata,
        "imgname": file.name,
      }
      let headers = new Headers({ 'Content-Type': 'application/json' })
      let options = new RequestOptions({ headers: headers });
      let apiUrl = environment.API_URL + "api/emps/SaveImage/" + this.id;
      this.http.put(apiUrl, Img, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
        data => {

          console.log(data)
          // console.log('success');
          this.croppedImage = data.ProfilePic;
        },
        error => console.log(error)
        )

    }

  }
  croppedImage(data) {
    this.fileChange(data);
  }

}
