import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RedBenchService } from '../Service/RedBenchService';
// import{Register} from '../Model/Register';
// import{RegisterResult,CustomMssage} from '../Model/RegisterResult';
import { Observable } from 'rxjs/RX';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { Organization, OrganizationResult, CustomMessage } from '../Model/organization';
@Component({
  templateUrl: 'forget.component.html'
})
export class ForgetComponent {
  constructor(private RedBenchService: RedBenchService, private route: ActivatedRoute, private router: Router, private _fb: FormBuilder) { }

  private id: string;
  private model = new Organization('', '', '', '', '', '', '', '', '', '', '', '', '', '');
  // private model=Register;
  private modelr = new OrganizationResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  // private model = new Forget('','','','','','Forget','','','','',);
  // private modelr = new ForgetResult('','','','','','','','','','','');
  returnUrl: string;
  error: string;
  success;
  public forgotForm: FormGroup;
  isLoading: boolean = false;
  imagesrc: any;
  ngOnInit() {
    this.imagesrc = "../../assets/img/avatars/logo.png";
    this.forgotForm = this._fb.group({
      'email': ['', Validators.required]
    });
  }

  forgetPwd() {

    this.isLoading = true;
    let commentOperation: Observable<CustomMessage>;


    commentOperation = this.RedBenchService.forgotPassword(this.model)

    commentOperation.subscribe(
      results => {

        // this.modelr = results;
        // console.log(this.modelr);
        this.success = results;
        // this.alertService.success('Registration successful Please verify Your Email for iu90uhjnmfvsigning In', true);
        // this.router.navigate(['/pages/forget']);
        this.isLoading = false;
      },
      err => {


        this.error = JSON.parse(err._body).Message;
        this.isLoading = false;
      });
  }
}
