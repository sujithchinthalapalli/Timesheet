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
  templateUrl: 'employeeinactive.component.html'
})
export class EmployeeInactiveComponent implements OnInit {
  order: string = 'FirstName';
  ascending = true;
  public myForm: FormGroup;
  private orgid: string;
  // loggedInUser: OrganizationResult;
  public InActiveEmployees: any = [];
  public loggedInUser: any;
  Id: any;
  private EmpResult: EmpResult;
  private modelrem = new EmpResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  private modelemlist1: EmpResult[] = [];


  private modelolist: OrganizationResult[] = [];
  private modelor = new OrganizationResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

  public OrgId: any;
  constructor(private router: Router, private toastr: ToastrService, private _fb: FormBuilder, private RedBenchService: RedBenchService) {
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {

    this.OrgId = this.loggedInUser.Id;
    this.Id = this.loggedInUser.Id;
    this.getInActiveEmps();

  }


  getInActiveEmps() {
    this.RedBenchService.getInActiveemps().subscribe(
      results => {

        this.modelemlist1 = results;
        for (var i = 0; i < this.modelemlist1.length; i++) {
          if (this.modelemlist1[i].Active == false) {
            this.InActiveEmployees.push(this.modelemlist1[i]);
          }
        }
      },
      error => {

      }
    )
  }


}
