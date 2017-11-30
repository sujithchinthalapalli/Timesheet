import { Component, OnInit } from '@angular/core';
// import { Timeoff, TimeoffResult } from '../model/Timeoff';
import { startOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
// import { Timesheetview, TimesheetviewResult } from '../Model/Timesheetview';
// import { WeekView, WeekViewResult } from '../Model/WeekView';
import { Observable } from 'rxjs/RX';
import { Routes, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RedBenchService } from '../Service/RedBenchService';
import { Dayview, DayviewResult } from '../Model/Dayview';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: 'description.component.html'
})
export class DescriptionComponent implements OnInit {
  // model = new Timeoff('', '', '', '', '', '', '', '');
  // modelr = new TimeoffResult('', '', '', '', '', '', '', '', '');
  view: string = 'day';
  isLoading: boolean = false;
  private DayviewResult: DayviewResult;
  private modeled = new Dayview('', '', '', '', '', '', '', '', '', '', '', '');
  private modelred = new DayviewResult('', '', '', '', '', '', '', '', '', '', '', '');
  private modeledlist: DayviewResult[] = [];
  public user: any;
  public myForm: FormGroup;
  Id: any;
  sub: any;

  private type: any;


  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;

  constructor(private toastr: ToastrService, private RedBenchService: RedBenchService, private _fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    //  constructor(private toastr: ToastrService) {}

  }

  ngOnInit(): void {
    this.type = this.user.Type;
    this.sub = this.route.params.subscribe(params => {
      this.Id = params['id']; // (+) converts string 'id' to a number

    });

    this.myForm = this._fb.group({
      'remarks': ['', Validators.required],

    });
    this.getdayviewbyId();
  }

  getdayviewbyId() {
    this.RedBenchService.getdayviewById(this.Id).subscribe(
      results => {

        this.modelred = results;
      },
      error => {

      });
  }

  update() {


    this.isLoading = true;
    this.modelred.Id = this.Id;
    this.modelred.Remarks = this.modeled.Remarks;
    let commentOperation: Observable<DayviewResult>;
    commentOperation = this.RedBenchService.updateDayview(this.modelred.Id, this.modelred)
    commentOperation.subscribe(
      results => {

        this.modelred = results;
        this.toastr.success('Success', 'Remarks saved successfully');
        this.router.navigate(['/timesheet/weekview']);
      },
      err => {


        this.isLoading = false;
      });
  }
}