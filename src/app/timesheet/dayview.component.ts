import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/RX';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SimpleTimer } from 'ng2-simple-timer';

import { RedBenchService } from '../Service/RedBenchService';
import { IMyDpOptions } from 'mydatepicker';
import { RegisterResult } from '../Model/RegisterResult';
import { Dayview, DayviewResult } from '../Model/Dayview';
import { Emp, EmpResult } from '../Model/Emp';
import { Daydata, DaydataResult } from '../Model/Daydata';

// import { PersonalFilterPipe } from './Personal.pipe';
@Component({
    templateUrl: 'dayview.component.html',
    providers: [RedBenchService]
})
export class DayviewComponent implements OnInit {
    isLoading: boolean = false;
    private DayviewResult: DayviewResult;
    private modelda = new Dayview('', '', '', '', '', '', '', '', '', '', '', '');
    private modelrda = new DayviewResult('', '', '', '', '', '', '', '', '', '', '', '');
    private modeldalist: DayviewResult[] = [];
    private modeldalist1: DayviewResult[] = [];
    private modeldalist2: DayviewResult[] = [];
    private modelbillable = new DayviewResult('', '', '', '', '', '', '', '', '', '', '', '');
    private modelelist: EmpResult[] = [];
    modele = new EmpResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

    private modeldaydata = new Daydata('', '');
    private modelrdaydata = new DaydataResult('', '', '', '', '', '', '', '', '', '', '');
    private type: any;
    private loading: any;
    public positions = [];
    private selectedObject: {};
    public Id: string;
    private OrgId: string;
    public isEdit: boolean = false;
    public myForm: FormGroup;
    private mytime = new Date();
    currentYear: any = this.mytime.getUTCFullYear();
    currentDate: any = this.mytime.getUTCDate() + 1;
    currentMonth: any = this.mytime.getUTCMonth() + 1; //months from 1-12
    public myDatePickerOptions: IMyDpOptions = {
        disableSince: { year: this.currentYear, month: this.currentMonth, day: this.currentDate },
        dateFormat: 'yyyy/mm/dd',

    };
    constructor(private _fb: FormBuilder, private router: Router, private RedBenchService: RedBenchService) {

        this.loading = JSON.parse(localStorage.getItem('currentUser'));



    }
    ngOnInit() {

        this.type = this.loading.Type;
        this.OrgId = this.loading.Id;

        if (this.type == "organization") {
            this.getdayview1();
        }
        else {

            this.Getdayviewbyempid();
            //    this.getdayviewbyid();
        }

        //  this.getAllEmployees();
        this.myForm = this._fb.group({

            'Date': ['', Validators.required],
        });

    }
    getdayview() {
        this.RedBenchService.getDayview().subscribe(
            results => {
                this.modeldalist = results;
            },
            error => {

            });
    }




    getdayview1() {
        this.RedBenchService.getDayview1().subscribe(
            results => {
                this.modeldalist1 = results;
            },
            error => {

            });
    }



    myCallback(e: any) {
        this.isEdit = true;
        this.modele.Id = e.Id;
        this.modele.FirstName = e.firstname;
        // this.modele.orgid = e.Id;
        // this.getdayviewbyid();
        this.Getdayviewbyempid();
        //  this.modele=e.firstname; 
    }
    getAllEmployees() {

        this.Id = this.OrgId;
        this.RedBenchService.getempsByorgId(this.Id).subscribe(
            results => {
                this.modelelist = results;
            },
            error => {

            });
    }


    public arraytest: any = [];
    postdayviewsdata() {


        this.isLoading = true;

        this.modeldaydata.Id = this.loading.Id;
        // this.modelda.EmpName=this.loggedInUser.FirstName;
        // this.modelda.Hours=this.modelda.End-this.modelda.Start;
        this.modeldaydata.Date = this.myForm.value.Date.formatted;
        let commentOperation: Observable<DaydataResult>;
        commentOperation = this.RedBenchService.postdayviewsdata(this.modeldaydata)
        commentOperation.subscribe(
            results => {

                this.arraytest = results;
                console.log(this.modeldaydata);
                this.isLoading = false;

                this.isEdit = true;
            },
            err => {

                this.isEdit = false;
                this.isLoading = false;
                // location.reload();

            });
    }


    Getdayviewbyempid() {

        this.Id = this.loading.Id;
        this.RedBenchService.Getdayviewbyempid(this.Id).subscribe(
            results => {

                this.modeldalist2 = results;
            },
            error => {

            });
    }

}
