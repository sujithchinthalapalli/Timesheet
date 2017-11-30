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
  templateUrl: 'companyprofileview.component.html'
})
export class CompanyprofileViewComponent implements OnInit {

  isLoading: boolean = false;
  public myForm: FormGroup;
  resultemp: EmpResult;
  isEdit: boolean = false;
  private modelrlist: OrganizationResult[] = [];
  private id: string;
  private url: any;
  private type: string;
  private firstletter: string;
  private profile: OrganizationResult[] = [];
  private imagesrc: any;
  private model = new Organization('', '', '', '', '', '', '', '', '', '', '', '', '', '');
  private modelr = new OrganizationResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  private modelLo: any;

  constructor(private http: Http, private RedBenchService: RedBenchService, private _fb: FormBuilder, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    this.modelLo = JSON.parse(localStorage.getItem('currentUser'));
    this.type = this.modelLo.Type;

    this.id = this.modelLo.Id;
    this.getOrgById(this.id);

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
  getOrgById(id) {
    this.RedBenchService.getOrgById(id).subscribe(
      results => {
        this.modelr = results;
        if (this.modelr.ProfilePic == null) {
          this.imagesrc = "../../assets/img/avatars/user-icon.jpg"
        }
        else if (this.modelr.ProfilePic == '') {
          this.imagesrc = "../../assets/img/avatars/user-icon.jpg"
        }
        else {
          this.imagesrc = this.modelr.ProfilePic;
        }
        this.myForm = this._fb.group({
          // 'firstName': [this.modelr.FirstName],
          // 'lastName': [this.modelr.LastName],
          // 'email': [this.modelr.Email],
          'gender': [this.modelr.Gender, Validators.required],
          'phone': [this.modelr.ContactNumber, Validators.required],
          'address': [this.modelr.Address, Validators.required],
          'city': [this.modelr.City, Validators.required],
          'state': [this.modelr.State, Validators.required],
          'zipcode': [this.modelr.Zipcode, Validators.required]
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
      let apiUrl1 = environment.API_URL +"/api/organizationts/ImageUpload/" + this.id;
      this.http.put(apiUrl1, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
        data => console.log('success'),
        error => console.log(error)
        )

    }

  }

}
