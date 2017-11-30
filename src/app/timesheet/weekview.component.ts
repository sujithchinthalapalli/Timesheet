import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { startOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addWeeks, subWeeks, addMonths, subMonths, addHours } from 'date-fns';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/RX';
import { NgModule } from '@angular/core';
import { RedBenchService } from '../Service/RedBenchService';
import { Dayview, DayviewResult } from '../Model/Dayview';
import { Emp, EmpResult } from '../Model/Emp';
import { Weekdata, WeekdataResult, Wkdata } from '../Model/weekdata';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { ToastrService } from 'ngx-toastr';
@Component({
    templateUrl: 'weekview.component.html',
    selector: 'data-bind',
    providers: [RedBenchService]
})
export class WeekviewComponent implements OnInit {
    isLoading: boolean = false;
    view: string = 'day';
    viewDate: Date = new Date();
    activeDayIsOpen: boolean = true;
    public Id: string;
    private sub: any;
    public isEdit: boolean = false;
    public Edit: boolean = false;

    public minDate: Date = void 0;
    private opened4: boolean = false;
    private type: any;


    private DayviewResult: DayviewResult;
    private modelda = new Dayview('', '', '', '', '', '', '', '', '', '', '', '');
    private modelrda = new DayviewResult('', '', '', '', '', '', '', '', '', '', '', '');
    private modele = new EmpResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    private modelweekdata = new Weekdata('', '');
    private modelWkdata = new Wkdata('', '', '', '');
    private modelrweekdata = new WeekdataResult('', '', '', '', '', '', '', '', '', '', '', '', '');
    private modeldalist: any[] = [];
    private modeldalist0: any;
    private modeldalist1: any[] = [];
    private modeldalist2: any;
    private modeldalist3: any;
    private modeldaalist = [];
    private loading: any;
    public myForm: FormGroup;
    private mytime = new Date();
    currentYear: any = this.mytime.getUTCFullYear();
    currentDate: any = this.mytime.getUTCDate() + 1;
    currentMonth: any = this.mytime.getUTCMonth() + 1; //months from 1-12
    public myDatePickerOptions: IMyDpOptions = {
        disableSince: { year: this.currentYear, month: this.currentMonth, day: this.currentDate },
        dateFormat: 'yyyy/mm/dd',

    };
    private mytime1 = new Date();
    currentYear1: any = this.mytime.getUTCFullYear();
    currentDate1: any = this.mytime.getUTCDate() + 1;
    currentMonth1: any = this.mytime.getUTCMonth() + 1;
    public myDatePickerOptions1: IMyDpOptions = {
        disableSince: { year: this.currentYear1, month: this.currentMonth1, day: this.currentDate1 },
        dateFormat: 'yyyy/mm/dd',

    };
    error: string;
    constructor(private toastr: ToastrService, private _fb: FormBuilder, private RedBenchService: RedBenchService, private router: Router) {
        this.loading = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {

        this.type = this.loading.Type;


        if (this.type == 'organization') {
            this.getDayviewweekreport();

        }
        else {


            this.onChange(event);
        }
        // this. postDayview() ;
        // this.getweekview();
        // this.getDayviewweekreportbyorgid();
        this.myForm = this._fb.group({
            // 'InvoiceID': ['', Validators.required],
            // 'OrganisationName': ['',Validators.required],
            // 'InvoiceDate':['',Validators.required],        
            'from': ['', Validators.required],
            'to': ['', Validators.required],
        });

    }



    public dateOptions: any = {
        formatYear: 'YY',
        startingDay: 1
    };
    onSelectionDone(a) {
        this.opened4 = false;
    }


    public arraytest: any;
    public totalweekhours: any;
    postdayviewsdata() {

        if (this.myForm.value.from.formatted <= this.myForm.value.to.formatted) {
            this.isLoading = true;

            this.modelweekdata.From = this.myForm.value.from.formatted;
            this.modelweekdata.To = this.myForm.value.to.formatted;

            let commentOperation: Observable<WeekdataResult>;
            commentOperation = this.RedBenchService.postweekviewsdata(this.modelweekdata)

            commentOperation.subscribe(
                results => {

                    this.modeldalist2 = results;
                    this.totalweekhours = this.modeldalist2.TotalHours;
                    this.modeldalist = this.modeldalist2.resdata;

                    console.log(this.modelweekdata);
                    this.isLoading = false;



                    this.isEdit = true;
                },
                err => {
                

                    this.isLoading = false;

                    this.error = JSON.parse(err._body).Message;
                    this.toastr.error('', this.error);

                });

        }
        else {

            this.isEdit = false;
            this.toastr.warning('', 'You have enter to Date is lower than from Date.Please change and go!');

        }
    }


    onChange(event) {

        var selectedValue = event

        if (selectedValue == 0 || selectedValue == '') {
            this.modelWkdata.Type = "ThisWeek";
            this.Edit = false;

        }
        else if (selectedValue == 1) {
            this.modelWkdata.Type = "LastWeek";
            this.Edit = false;
        }
        else if (selectedValue == 2) {
            this.modelWkdata.Type = "ThisMonth";
            this.Edit = false;

        }
        else if (selectedValue == 3) {
            this.modelWkdata.Type = "LastMonth";
            this.Edit = false;
        }

        else {
            this.modelWkdata.Type = "ThisWeek";

        }
        this.modelWkdata.EmpId = this.loading.Id;


        let commentOperation: Observable<WeekdataResult>;
        commentOperation = this.RedBenchService.postweekdata(this.modelWkdata)

        commentOperation.subscribe(
            results => {


                this.modeldalist2 = results;

                this.totalweekhours = this.modeldalist2.TotalHours;
                this.modeldalist3 = this.modeldalist2.resdata;


                this.isLoading = false;
                this.isEdit = true;

            },
            err => {

                this.isLoading = false;

                this.error = JSON.parse(err._body).Message;
                this.toastr.error('', this.error);

            });

        if (selectedValue == 4) {

            this.modelWkdata.Type = "MoreDays";
            this.isEdit = false;
            this.Edit = true;

        }

    }


    dayviewsdata() {

        if (this.myForm.value.from.formatted <= this.myForm.value.to.formatted) {
            this.modelWkdata.EmpId = this.loading.Id;
            this.isLoading = true;
            this.modelWkdata.Type = "MoreDays";
            this.modelWkdata.FromDate = this.myForm.value.from.formatted;
            this.modelWkdata.ToDate = this.myForm.value.to.formatted;
            let commentOperation: Observable<WeekdataResult>;
            commentOperation = this.RedBenchService.postweekdata(this.modelWkdata)

            commentOperation.subscribe(
                results => {

                    this.modeldalist2 = results;
                    this.totalweekhours = this.modeldalist2.TotalHours;
                    this.modeldalist3 = this.modeldalist2.resdata;

                    // console.log(this.modelweekdata);
                    this.isLoading = false;
                    this.Edit = true;
                },
                err => {
                 

                    this.isLoading = false;

                    this.error = JSON.parse(err._body).Message;
                    this.toastr.error('', this.error);

                });
        }
        else {

            this.isEdit = false;
            this.toastr.warning('', 'You have enter to Date is lower than from Date.Please change and go!');

        }

    }

    getTotal = function () {

        var Total = 0;

        return (Total || 0);
    }

    getDayviewweekreportbyorgid() {

        this.RedBenchService.getDayviewweekreportbyorgid().subscribe(
            results => {
                this.modeldalist1 = results;
            },
            error => {

            });


    }

    public totalhours: any;
    getDayviewweekreport() {


        this.RedBenchService.getDayviewweekreport(this.loading.Id).subscribe(
            results => {


                this.modeldalist0 = results;
                this.totalhours = this.modeldalist0.TotalHours;
                this.modeldalist = this.modeldalist0.resdata;


            },
            error => {

            }
        );

    }



}