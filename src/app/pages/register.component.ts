import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RedBenchService } from '../Service/RedBenchService';
// import{Register} from '../Model/Register';
// import{RegisterResult} from'../Model/RegisterResult';
import { Observable } from 'rxjs/RX';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Organization, OrganizationResult } from '../Model/Organization';
import { Emp, EmpResult } from '../Model/Emp';
import { ToastrService } from 'ngx-toastr';
@Component({
    templateUrl: 'register.component.html',
    providers: [RedBenchService]
})
export class RegisterComponent implements OnInit {

    constructor(private RedBenchService: RedBenchService, private toastr: ToastrService, private _fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }
    private modelrlist: OrganizationResult[] = [];
    private model = new Organization('', '', '', '', '', '', '', '', '', 'organization', '', 'Register', '', '');
    private modelr = new OrganizationResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    isLoading: boolean = false;
    public myForm: FormGroup;
    private modelemplist: EmpResult[] = [];
    private modele = new Emp('', '', '', '', '', '', '', '', '', 'employee', '', '', 'Register', '', '');
    private modelem = new EmpResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    isemployee: boolean = true;
    isorg: boolean = true;
    type: any;
    private id: string;
    error: string;
    imagesrc: any;
    ngOnInit() {
        this.imagesrc = "../../assets/img/avatars/logo.png";
        this.type = this.route.snapshot.queryParams["type"];
        this.id = this.route.snapshot.queryParams["id"];
        this.modele = new Emp('', '', '', '', '', '', '', '', '', this.type, '', this.id, 'Register', '', '')
        if (this.type == "employee") {
            this.modele.Email = this.route.snapshot.queryParams["email"];
            this.modele.FirstName = this.route.snapshot.queryParams["firstname"];
            this.isorg = false;
            this.isemployee = true;
            this.myForm = this._fb.group({
                'email': [this.modele.Email, Validators.required],
                'password': ['', Validators.required],
                'repeatpassword': ['', Validators.required],
                'firstname': [this.modele.FirstName, Validators.required],
                'lastname': ['', Validators.required]
            });
        }
        else {
            this.isemployee = false;
            this.isorg = true;
            this.myForm = this._fb.group({
                'email': ['', Validators.required],
                'password': ['', Validators.required],
                'repeatpassword': ['', Validators.required],
                'firstname': ['', Validators.required],
                'lastname': ['', Validators.required]
            });
        }
    }


    register() {

        if (this.model.Password == this.myForm.value.repeatpassword) {
            this.isLoading = true;
            let commentOperation: Observable<OrganizationResult>;
            commentOperation = this.RedBenchService.postOrg(this.model)
            commentOperation.subscribe(
                results => {

                    this.model = new Organization('', '', '', '', '', '', '', '', '', '', '', '', '', '');
                    this.modelr = results;
                    console.log(this.modelr);
                    // this.router.navigate(['/pages/login']);
                    this.myForm.reset();
                },
                err => {
                    // Log errors if any

                    this.error = JSON.parse(err._body).Message;
                    //                     this.isLoading = false;
                });
        }

    }

    registeremp() {

        if (this.modele.Password == this.myForm.value.repeatpassword) {
            this.isLoading = true;
            // this.modelem.Active="true";
            let commentOperation: Observable<EmpResult>;
            commentOperation = this.RedBenchService.postEmp(this.modele)
            commentOperation.subscribe(
                results => {
                    this.modele = new Emp('', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
                    this.modelem = results;
                    console.log(this.modelem);
                    this.toastr.success('Success', 'Employee Registered successfully');
                    this.router.navigate(['/pages/login']);
                    this.myForm.reset();
                },
                err => {

                    this.error = JSON.parse(err._body).Message;
                });
        }
        else {
            this.error = "Password Mismatch!"
        }
    }

}
