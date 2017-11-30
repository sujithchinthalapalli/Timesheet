import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RedBenchService } from '../Service/RedBenchService';
// import{Register} from '../Model/Register';
// import{RegisterResult,CustomMessage} from '../Model/RegisterResult';
import { Observable } from 'rxjs/RX';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Organization, OrganizationResult, CustomMessage } from '../Model/organization';

@Component({
    templateUrl: 'reset.component.html'
})
export class ResetComponent implements OnInit {
    constructor(private RedBenchService: RedBenchService, private _fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

    private model = new Organization('', '', '', '', '', '', '', '', '', '', '', '', '', '');
    private Id;
    private error;
    private success;
    public resetForm: FormGroup;
    imagesrc: any;
    ngOnInit() {
        this.imagesrc = "../../assets/img/avatars/logo.png";
        let parmId = this.route.snapshot.queryParams["pass"];
        this.Id = parmId;

        this.resetForm = this._fb.group({

            'password': ['', Validators.required],
            'confirmpassword': ['', Validators.required]
        });
    }

    reset() {
        let commentOperation: Observable<CustomMessage>;


        if (this.model.Password == this.resetForm.value.confirmpassword) {
            commentOperation = this.RedBenchService.resetPassword(this.Id, this.model)

            commentOperation.subscribe(
                results => {

                    //this.modelr = results;
                    // console.log(this.modelr);

                    // this.alertService.success('Registration successful Please verify Your Email for iu90uhjnmfvsigning In', true);
                    this.success = results;
                    this.router.navigate(['/pages/login']);


                },
                err => {

                    // Log errors if any

                    this.error = JSON.parse(err._body).Message;
                });
        } else {
            this.error = "Password Mismatch !"
        }
    }
}
