import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RedBenchService } from '../../Service/RedBenchService';
import { Organization, OrganizationResult } from '../../Model/organization';
import { Emp, EmpResult } from '../../Model/emp';
import { Observable } from 'rxjs/RX';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: 'myprofileview.component.html'
})
export class MyprofileViewComponent implements OnInit {

  isLoading: boolean = false;
  public myForm: FormGroup;
  resultemp: EmpResult;
  isEdit: boolean = false;
  private modelrlist: OrganizationResult[] = [];
  private id: string;
  private url: any;
  private type: string;
  private firstletter: string;
  private imagesrc: any;
  private imagesrc1: any;
  private modelLo: any;
  private modelrem = new EmpResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

  constructor(private http: Http, private RedBenchService: RedBenchService, private _fb: FormBuilder, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    this.modelLo = JSON.parse(localStorage.getItem('currentUser'));
    this.type = this.modelLo.Type;

    this.id = this.modelLo.Id;
    this.id = this.modelLo.Id;
    this.GetempsById(this.id);

    this.myForm = this._fb.group({
      // 'firstName': [''],
      // 'lastName': [''],
      // 'email': [''],
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
        if (this.modelrem.ProfilePic == null) {
          this.imagesrc = "../../assets/img/avatars/user-icon.jpg"
        }
        else if (this.modelrem.ProfilePic == '') {
          this.imagesrc = "../../assets/img/avatars/user-icon.jpg"
        }
        else {
          this.imagesrc = this.modelrem.ProfilePic;
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


  fileChange(event) {

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file);
      formData.append('wid', this.id)
      let headers = new Headers()
      let options = new RequestOptions({ headers: headers });
      let apiUrl = environment.API_URL +"/api/emps/ImageUpload/" + this.id;
      this.http.put(apiUrl, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
        data => console.log('success'),
        error => console.log(error)
        )

    }

  }

}
