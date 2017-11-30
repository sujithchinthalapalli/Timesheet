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
  templateUrl: 'employeeactive.component.html'
})
export class EmployeeActiveComponent implements OnInit {
  order: string = 'FirstName';
  ascending = true;
  public myForm: FormGroup;
  private orgid: string;
  public ActiveEmployees: any = [];
  // loggedInUser: OrganizationResult;
  public loggedInUser: any;
  Id: any;
  private EmpResult: EmpResult;
  private modelem = new Emp('', '', '', '', '', '', '', '', '', 'employee', '', '', 'Invitation', '', '');
  private modelrem = new EmpResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  private modelemlist2: EmpResult[] = [];
  // private modelrem1: EmpResult[] = [];

  private modelolist: OrganizationResult[] = [];
  private modelo = new Organization('', '', '', '', '', '', '', '', '', 'organization', '', 'Register', '', '');
  private modelor = new OrganizationResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

  public OrgId: any;
  private modelembillable = new EmpResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  constructor(private router: Router, private toastr: ToastrService, private _fb: FormBuilder, private RedBenchService: RedBenchService) {
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {

    this.OrgId = this.loggedInUser.Id;
    this.Id = this.loggedInUser.Id;
    this.getActiveEmps();
  }

  getActiveEmps() {
    this.RedBenchService.getActiveemps().subscribe(
      results => {

        this.modelemlist2 = results;
        for (var i = 0; i < this.modelemlist2.length; i++) {
          if (this.modelemlist2[i].Active == true) {
            this.ActiveEmployees.push(this.modelemlist2[i]);
          }
        }
      },
      error => {
    
      }
    )
  }

}
