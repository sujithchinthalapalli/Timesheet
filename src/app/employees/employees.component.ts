import { Component, OnInit } from '@angular/core';
// import { Timeoff, TimeoffResult } from '../model/Timeoff';
import { Observable } from 'rxjs/RX';
import { RedBenchService } from '../Service/RedBenchService';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Emp, EmpResult } from '../Model/emp';
import { Organization, OrganizationResult } from '../Model/Organization';

import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: 'employees.component.html'
})
export class EmployeesComponent implements OnInit {

    public myForm: FormGroup;
    private orgid: string;
    // loggedInUser: OrganizationResult;
    public loggedInUser: any;
    Id: any;
    isLoading: boolean = false;
    private EmpResult: EmpResult;
    private modelem = new Emp('', '', '', '', '', '', '', '', '', 'employee', '', '', 'Invitation', '', '');
    private modelrem = new EmpResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    private modelemlist: EmpResult[] = [];
    // private modelrem1: EmpResult[] = [];
    order: string = 'FirstName';
    ascending = true;
    private modelolist: OrganizationResult[] = [];
    private modelo = new Organization('', '', '', '', '', '', '', '', '', 'organization', '', 'Register', '', '');
    private modelor = new OrganizationResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

    public OrgId: any;
    private modelembillable = new EmpResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    constructor(private router: Router, private toastr: ToastrService, private _fb: FormBuilder, private RedBenchService: RedBenchService) {
        this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ngOnInit() {
        this.getemp();
        // this.getorg();

        this.OrgId = this.loggedInUser.Id;
        this.Id = this.loggedInUser.Id;
        this.getempsByOrgId();
        //  getempbyId() 
        // this.getempsByOrgId(this.loggedInUser.ID);
        this.myForm = this._fb.group({
            'name': ['', Validators.required],
            'email': ['', Validators.required],

        });
        // postemp()
    }




    clear() {
        this.myForm.reset();

        this.modelem = new Emp('', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

    }


    getemp() {
        this.RedBenchService.getEmp().subscribe(
            results => {
                this.modelemlist = results;
            },
            error => {

            });
    }




    getempsByOrgId() {

        this.RedBenchService.getempsByorgId(this.Id).subscribe(
            results => {

                this.modelemlist = results;

            },
            error => {

            });
    }




    postemp() {

        this.isLoading = true;
        this.modelem.OrgId = this.OrgId;


        let commentOperation: Observable<EmpResult>;
        commentOperation = this.RedBenchService.postEmp(this.modelem)
        commentOperation.subscribe(
            results => {

                this.modelrem = results;
                console.log(this.modelrem);
                this.getemp()
                this.toastr.success('Invitation', 'Invitation Sent Successfully');
                this.router.navigate(['/employees']);
                location.reload();

            },
            err => {

                this.isLoading = false;
            });
    }
}
