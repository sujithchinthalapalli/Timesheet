import { Component, OnInit } from '@angular/core';
import { Routes, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/RX';
import { RedBenchService } from '../Service/RedBenchService';
// import {  ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Dayview, DayviewResult } from '../Model/Dayview';

// import { TokenCreate } from '../model/token';

import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: 'Dayviewmodel.component.html',
    providers: [RedBenchService]
})
export class DayviewmodelComponent implements OnInit {


    //     private token: TokenCreate;
    //        public invoiceForm: FormGroup;
    //  private modelt = new TokenCreate('');

    isLoading: boolean = false;
    public numberMask = [/\d/, /\d/, ':', /\d/, /\d/];
    private DayviewResult: DayviewResult;
    private modelda = new Dayview('', '', '', '', '', '', '', '', '', '', '', '');
    private modelrda = new DayviewResult('', '', '', '', '', '', '', '', '', '', '', '');
    private modeldalist: DayviewResult[] = [];
    private modelbillable = new DayviewResult('', '', '', '', '', '', '', '', '', '', '', '');
    public isEdit: boolean = false;
    viewDate: Date = new Date();
    public myForm: FormGroup;
    public loggedInUser: any;
    public hours: any;
    orgId: any;

    constructor(private toastr: ToastrService, private RedBenchService: RedBenchService, private _fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));

    }
    ngOnInit(): void {

        //         sessionStorage.removeItem('token');
        // this.invoiceForm = this._fb.group({

        //       input1: this._fb.array([this.initItemRows()])

        //     }
        //     );


        this.orgId = this.loggedInUser.ID;
        this.myForm = this._fb.group({
            'client': ['', Validators.required],
            'project': ['', Validators.required],
            'task': ['', Validators.required],
            'start': ['', Validators.required],
            'end': ['', Validators.required],
            // 'hours': ['', Validators.required],
            'notes': ['', Validators.required],
            // 'remarks': ['', Validators.required]
        });
    }



    //  initItemRows() {
    //         return this._fb.group({
    //             'Col1': [''],

    //         });
    //     }



    Back() {
        this.router.navigate(['/timesheet/dayview']);
    }
    formatTime(timeMs: number) {
        let hours: string,
            minutes: string;
        hours = Math.floor(timeMs / 3600).toString();
        minutes = Math.floor(timeMs / 60000).toString();
        // seconds = ((timeMs % 60000) / 1000).toFixed(3);
        return hours + ':' + minutes;
    }
    calc() {
        if (this.modelda.StartTime != null && this.modelda.EndTime != null)
            this.modelda.Hours = (this.modelda.EndTime) - (this.modelda.StartTime);
    }
    getdayview() {

        this.RedBenchService.getDayview().subscribe(
            results => {
                this.modeldalist = results;
            },
            error => {

            });
    }







    postDayview() {

        if (this.modelda.StartTime < this.modelda.EndTime) {
            this.isLoading = true;

            this.modelda.EmpId = this.loggedInUser.Id;
            this.modelda.EmpName = this.loggedInUser.FirstName;
            let commentOperation: Observable<DayviewResult>;
            commentOperation = this.RedBenchService.postDayview(this.modelda)
            commentOperation.subscribe(
                results => {


                    this.modelrda = results;
                    console.log(this.modelrda);
                    this.toastr.success('Success', 'Successfully saved your Dayview Data');
                    this.getdayview();
                    this.router.navigate(['/timesheet/dayview']);

                    this.isEdit = true;
                },
                err => {

                    this.isLoading = false;
                });
        }
        else {
            this.toastr.warning('', ' You have enter End Date is lower than Start  Date.Please change and save !');
        }
    }
}
