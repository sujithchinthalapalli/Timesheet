import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/RX';
import { Invoice, InvoiceResult } from '../Model/Invoice';
import { Invoiceproduct, InvoiceproductResult } from '../Model/Invoiceproduct';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { RedBenchService } from '../Service/RedBenchService';
import { IMyDpOptions } from 'mydatepicker';
import { Organization, OrganizationResult } from '../Model/Organization';
import { Emp, EmpResult } from '../Model/Emp';
import { ToastrService } from 'ngx-toastr';
import { Weekdata, WeekdataResult, Wkdata } from '../Model/weekdata';
import { Daydata, DaydataResult } from '../Model/Daydata';
import { Dayview, DayviewResult } from '../Model/Dayview';
@Component({
  templateUrl: 'invoicecreate.component.html',
  providers: [RedBenchService]

})
export class InvoiceCreateComponent implements OnInit {
  private InvoiceResult: InvoiceResult;
  ascending = true;
  order: string = 'FirstName';
  public invoiceForm: FormGroup;
  model = new Invoice('', '', '', '', '', '', '', '');
  public modelr = new InvoiceResult('', '', '', '', '', '', '', '', '');
  public Id: string;
  private OrgId: string;
  modelplist: Invoiceproduct[] = [];
  modelp = new Invoiceproduct('', '', '', '', '', '', '', '');
  modelrp = new InvoiceproductResult('', '', '', '', '', '', '', '', '');
  modele = new EmpResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

  modelerlist: EmpResult[] = [];
  modelelist: any;
  modelo = new OrganizationResult('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  private modelolist: OrganizationResult[] = [];
  private modelrweekdata = new WeekdataResult('', '', '', '', '', '', '', '', '', '', '', '', '');
  private modelWkdata = new Wkdata('', '', '', '');
  private modelrda = new DayviewResult('', '', '', '', '', '', '', '', '', '', '', '');
  private modeldalist1: any[] = [];
  private modeldalist2: any;
  private modeldalist3: any;
  private modeldaalist = [];
  private Main: boolean = false;
  private Main1: boolean = false;
  public myForm: FormGroup;
  public myForm1: FormGroup;
  public myForm2: FormGroup;
  isLoading: boolean = false;
  private loading: any;
  public totalweekhours: any;
  public hours: any;
  type: string;

  private error: any;
  name: string;
  email: string;
  private loggedInUser: OrganizationResult;

  private mytime = new Date();
  currentYear: any = this.mytime.getUTCFullYear();
  currentDate: any = this.mytime.getUTCDate() - 1;
  currentMonth: any = this.mytime.getUTCMonth() + 1; //months from 1-12
  public myDatePickerOptions: IMyDpOptions = {
    disableUntil: { year: this.currentYear, month: this.currentMonth, day: this.currentDate },
    dateFormat: 'yyyy/mm/dd',

  };
  private mytime1 = new Date();
  currentYear1: any = this.mytime.getUTCFullYear();
  currentDate1: any = this.mytime.getUTCDate() - 1;
  currentMonth1: any = this.mytime.getUTCMonth() + 1; //months from 1-12
  public myDatePickerOptions1: IMyDpOptions = {
    disableUntil: { year: this.currentYear1, month: this.currentMonth1, day: this.currentDate1 },
    dateFormat: 'yyyy/mm/dd',

  };

  private Result: any;
  private test: any[] = [];
  constructor(private RedBenchService: RedBenchService, private toastr: ToastrService, private _fb: FormBuilder, private router: Router) {

    this.InvoiceResult = JSON.parse(localStorage.getItem('currentUser'));
    this.Result = JSON.parse(localStorage.getItem('currentUser'));
  }


  ngOnInit(): void {


    this.modelp.Amount = 0;
    this.getOrganization();
    this.model.OrgId = this.Result.Id;
    this.name = this.Result.FirstName;
    this.OrgId = this.Result.Id;
    this.modelp.EmpId = this.modele.Id;

    this.getActiveEmps();
    this.myForm = this._fb.group({

      'InvoiceDate': ['', Validators.required],
      'InvoiceDueDate': ['', Validators.required],
    });



    this.invoiceForm = this._fb.group({
      products: this._fb.array([this.initItemRows()])

    }
    );
  }

  initItemRows(): FormGroup {

    return this._fb.group({
      'description': [null, Validators.required],
      'account': [null, Validators.required],
      'EmpId': [null, Validators.required],
      'hours': [],
      'hourlyrate': [null, Validators.required],
      'amount': [],
    });
  }

  public isEdit: boolean = false;
  public orgid: string;

  myCallback(e: any) {
    this.isEdit = true;
    this.modelo.FirstName = e.FirstName;
    this.modelo.Email = e.Email;
  }

  getTotal = function () {
    var Total = 0;
    for (var i = 0; i < this.invoiceForm.controls.products.controls.length; i++) {
      Total += this.invoiceForm.controls.products.controls[i].HourlyRate * this.hours;


    }

    this.model.Total = Total;
    return (Total || 0);
  }


  public hoursvalue: any;
  onChange(event) {
    var selectedValue = event;
    this.modelWkdata.EmpId = selectedValue;
    this.modelWkdata.Type = "ThisWeek";
    let commentOperation: Observable<WeekdataResult>;
    commentOperation = this.RedBenchService.postweekdata(this.modelWkdata)

    commentOperation.subscribe(
      results => {

        this.modeldalist2 = results;
        this.totalweekhours = this.modeldalist2.TotalHours;
        this.hours = this.modeldalist2.Hours
        this.isLoading = false;

      },
      err => {




      });


  }

  addNewRow() {
    const control = <FormArray>this.invoiceForm.controls['products'];
    control.push(this.initItemRows());
    console.log("control");
  }

  deleteRow(index: number) {
    const control = <FormArray>this.invoiceForm.controls['products'];
    control.removeAt(index);
  }


  getOrganization() {
    this.RedBenchService.getOrganizations().subscribe(
      results => {
        this.modelolist = results;
      },
      error => {

      }
    );
  }


  getActiveEmps() {
    this.RedBenchService.getActiveemps().subscribe(
      results => {
        this.modelerlist = results;
      },
      error => {

      }
    );
  }
  getempsByOrgId(Id: any) {
    this.RedBenchService.getempsByorgId(this.Id).subscribe(
      results => {
        this.modelelist = results;

      },
      error => {

      });
  }

  postInvoice() {

    if (this.myForm.value.InvoiceDate.formatted <= this.myForm.value.InvoiceDueDate.formatted) {
      this.isLoading = true;
      this.model.OrgName = this.Result.FirstName;
      this.model.OrgId = this.Result.Id;
      this.model.InvoiceDate = this.myForm.value.InvoiceDate.formatted;
      this.model.InvoiceDueDate = this.myForm.value.InvoiceDueDate.formatted;
      this.model.products = this.invoiceForm.value.products;
      this.model.products.EmpId = this.modelp.EmpId;
      let commentOperation: Observable<InvoiceResult>;
      commentOperation = this.RedBenchService.postInvoice(this.model)
      commentOperation.subscribe(
        results => {
          this.model = new Invoice('', '', '', '', '', '', '', '');
          this.modelr = results;
          this.Id = this.modelr.Id;
          console.log(this.modelr);
          this.toastr.success('Success', 'Your Invoice successfully saved');
          this.router.navigate(['/Invoice']);
          if (this.modelr.Id) {
            this.Main = true;
            console.log(this.modelr);
            this.isLoading = false;
          }
        },
        err => {

        });
    }
    else {
      this.toastr.warning('', ' You have enter Invoice Due Date is lower than Invoice Date.Please change and save !');
    }
  }

  postproduct() {
    this.modelp.InvoiceId = this.Id;
    this.modelp.EmpId = this.modele.Id;

    let commentOperation: Observable<InvoiceproductResult>;

    commentOperation = this.RedBenchService.postproduct(this.modelp)

    commentOperation.subscribe(
      results => {
        this.modelp = new Invoiceproduct('', '', '', '', '', '', '', '');
        this.modelrp = results;
        console.log(this.modelrp);
        this.toastr.success('Success', 'Invoice saved  Successfully with  Product details');
        this.router.navigate(['/Invoice']);
      },
      err => {



      });
  }

  dayviewsdata(Id: any) {

    this.modelWkdata.EmpId = this.modelp.EmpId;

    this.modelWkdata.Type = "ThisWeek";
    let commentOperation: Observable<WeekdataResult>;
    commentOperation = this.RedBenchService.postweekdata(this.modelWkdata)

    commentOperation.subscribe(
      results => {

        this.modeldalist2 = results;
        this.totalweekhours = this.modeldalist2.TotalHours;
        this.hours = this.modeldalist2.Hours
        this.isLoading = false;

      },
      err => {



      });


  }


}