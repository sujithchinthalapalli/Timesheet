import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RedBenchService } from '../Service/RedBenchService';
// import{Register} from '../Model/Register';
// import{RegisterResult} from'../Model/RegisterResult';
import { Organization, OrganizationResult, CustomMessage } from '../Model/organization';

import { Observable } from 'rxjs/RX';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from "angular2-social-login";
// import{LinkedInData} from '../Model/Register';


declare let OktaAuth: any;

@Component({
  templateUrl: 'login.component.html',
  providers: [RedBenchService, OAuthService]
})
export class LoginComponent implements OnInit {

  constructor(public _auth: AuthService, private oauthService: OAuthService, private RedBenchService: RedBenchService, private route: ActivatedRoute, private router: Router, private _fb: FormBuilder) {
  }

  private modelrlist: OrganizationResult[] = [];
  private id: string;
  public myForm_: FormGroup;
  private model = new Organization('', '', '', '', '', '', '', '', '', '', '', 'Login', '', '');
  private modelr: any;
  returnUrl: string;
  error: string;
  isLoading: boolean = false;
  isOktaLoading: boolean = false;
  isLinkedInLoading: boolean = false;
  sub: any;
  imagesrc: any;
  ngOnInit() {
    // reset login status
    this.imagesrc = "../../assets/img/avatars/logo.png";
    localStorage.removeItem('currentUser');

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.myForm_ = this._fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }
  login() {

    this.isLoading = true;
    let commentOperation: Observable<OrganizationResult>;
    commentOperation = this.RedBenchService.postOrg(this.model)
    commentOperation.subscribe(
      results => {

        this.model = new Organization('', '', '', '', '', '', '', '', '', '', '', '', '', '');
        this.modelr = results;
        console.log(this.modelr);
        localStorage.setItem('currentUser', JSON.stringify(this.modelr));
        localStorage.setItem('logintype', 'direct')
        this.router.navigate([this.returnUrl]);
      },
      err => {
        // Log errors if any

        // alert('please enter correct username and Password');
        // location.reload();
        this.error = JSON.parse(err._body).Message;
        this.isLoading = false;
      });
  }
}
