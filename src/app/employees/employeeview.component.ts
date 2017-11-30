import { Component, OnInit } from '@angular/core';
// import { Timeoff, TimeoffResult } from '../model/Timeoff';
import { Observable } from 'rxjs/RX';
import { RedBenchService } from '../Service/RedBenchService';
import { Routes, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Emp, EmpResult } from '../Model/emp';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

@Component({
  templateUrl: 'employeeview.component.html'
})
export class EmployeeViewComponent implements OnInit {


  private orgid: string;
  // loggedInUser: OrganizationResult;
  public loggedInUser: any;
  Id: any;
  private modelrem = new EmpResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  private sub: any;
  isEdit: boolean = false;
  imagesrc: any;
  imagesrc1: any;
  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private RedBenchService: RedBenchService) {
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this.imagesrc1 = "../../assets/img/avatars/user-icon.jpg";
    this.sub = this.route.params.subscribe(params => {
      this.Id = params['id'];
    });
    this.GetempsById();
  }




  GetempsById() {
    this.RedBenchService.GetempsById(this.Id).subscribe(
      results => {

        this.modelrem = results;
        if (this.modelrem.ProfilePic == '') {
          this.imagesrc = "../../assets/img/avatars/user-icon.jpg"
        }
        else {
          this.imagesrc = this.modelrem.ProfilePic;
        }

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
      formData.append('wid', this.Id)
      let headers = new Headers()
      //headers.append('Content-Type', 'json');  
      //headers.append('Accept', 'application/json');  
      let options = new RequestOptions({ headers: headers });
      // options.params = 5321;
      let apiUrl = "http://redbenchservice.azurewebsites.net/api/emps/ImageUpload/" + this.Id;
      // let apiUrl1 = "http://localhost:55810/api/orgs/ImageUpload/"+this.id;
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
