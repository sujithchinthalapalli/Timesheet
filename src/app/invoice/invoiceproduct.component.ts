import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/RX';
import { Invoice, InvoiceResult } from '../Model/Invoice';
import { Invoiceproduct, InvoiceproductResult } from '../Model/Invoiceproduct';
import { TextMaskModule } from 'angular2-text-mask';
import { RedBenchService } from '../Service/RedBenchService';
import { IMyDpOptions } from 'mydatepicker';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
@Component({
  templateUrl: 'invoiceproduct.component.html',
  selector: 'data-bind',

  providers: [RedBenchService]
})
export class InvoiceProductComponent implements OnInit {
  public dateMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  private InvoiceResult: InvoiceResult;
  modelrlist: InvoiceResult[] = [];
  modelrplist: InvoiceproductResult[] = [];
  model = new Invoice('', '', '', '', '', '', '', '');
  public modelr = new InvoiceResult('', '', '', '', '', '', '', '', '');
  public Id: string;
  private sub: any;
  private Main: boolean = false;
  private Main1: boolean = false;
  modelplist: Invoiceproduct[] = [];
  modelp = new Invoiceproduct('', '', '', '', '', '', '', '');
  modelrp = new InvoiceproductResult('', '', '', '', '', '', '', '', '');
  isLoading: boolean = false;
  // private startDate:any;
  // private endDate:any;
  public myForm: FormGroup;
  public invoiceForm: FormGroup;

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
  private startDate: object = { date: { year: 2017, month: 1, day: 1 } };
  private endDate: object = { date: { year: 2017, month: 1, day: 1 } };
  constructor(private RedBenchService: RedBenchService, private _fb: FormBuilder, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
    this.InvoiceResult = JSON.parse(localStorage.getItem('invoicelocalstorage'));
    // console.log('myTable constructed'); 
  }
  rowData = [
    {
      Candidate: 'Candidate',
      Description: 'Description',
      Account: 'Account',
      Hours: 'Hours',
      HourlyRate: 'HourlyRate',
      Amount: 'Amount'

    }
  ]
  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.Id = params['id'];
    });

    this.myForm = this._fb.group({
      // 'InvoiceID': ['', Validators.required],
      // 'OrganisationName': ['',Validators.required],
      'InvoiceDate': ['', Validators.required],
      'InvoiceDueDate': ['', Validators.required],
    });


    this.getproductsbyInvoiceid(this.Id);
    this.getInvoice(this.Id);
  }
  public print = (): void => {
    window.print();
    // this.toastr.success('Success', 'Successfully Invoice Priented');
  }
  public minDate: Date = void 0;
  private opened: boolean = false;
  private opened1: boolean = false;
  public dateOptions: any = {
    formatYear: 'YY',
    startingDay: 1
  };

  onSelectionDone(a) {
    this.opened = false;
    this.opened1 = false;
  }

  getTotal = function () {
    var total = 0;
    for (var i = 0; i < this.invoice.products.length; i++) {
      total += this.invoice.products[i].unit_price * this.invoice.products[i].quantity;
    }
    return total;
  }

  myCallback(e: any) {

    this.modelr.OrgId = e.ID;
    // this.modelr.VendorId=e.ID;

  }
  postInvoice() {


    let commentOperation: Observable<InvoiceResult>;
    commentOperation = this.RedBenchService.postInvoice(this.model)

    commentOperation.subscribe(
      results => {

        this.model = new Invoice('', '', '', '', '', '', '', '');
        this.modelr = results;
        this.Id = this.modelr.Id;
        console.log(this.modelr);
        if (this.modelr.Id) {
          this.Main = true;


          console.log(this.modelr);
          // localStorage.setItem('invoicelocalstorage', JSON.stringify(this.modelr));
        }

      },
      err => {


      });
  }

  postproduct() {

    this.modelp.InvoiceId = this.Id;
    // this.modelp.EmpId=this.modelp.CandidateName;
    let commentOperation: Observable<InvoiceproductResult>;

    commentOperation = this.RedBenchService.postproduct(this.modelp)

    commentOperation.subscribe(
      results => {
        this.modelp = new Invoiceproduct('', '', '', '', '', '', '', '');
        this.modelrp = results;
        console.log(this.modelrp);

        this.router.navigate(['/Invoice']);
      },
      err => {


      });
  }

  getAllInvoices() {


    this.RedBenchService.getInvoice().subscribe(

      results => {

        this.modelrlist = results;
      },
      error => {

      });
  }

  getproductsbyInvoiceid(Id: any) {

    this.RedBenchService.getInvoiceProductsById(Id).subscribe(
      results => {
        this.modelrplist = results;
      },
      error => {

      }
    );
  }


  getInvoice(Id: any) {

    this.RedBenchService.getInvoiceById(Id).subscribe(
      results => {

        this.modelr = results;
        this.startDate = { date: this.modelr.InvoiceDate };
        this.endDate = { date: this.modelr.InvoiceDueDate };

      },
      error => {

      }
    );
  }


  postInvoiceEmail() {

    this.modelr.Id = this.modelr.Id;
    this.modelr.OrgId = this.modelr.OrgId;
    this.modelr.OrgName = this.modelr.OrgName;
    //  this.modelr.InvoiceId = this.modelr.InvoiceId;
    this.modelr.InvoiceDate = this.modelr.InvoiceDate;
    this.modelr.InvoiceDueDate = this.modelr.InvoiceDueDate;

    let commentOperation: Observable<InvoiceResult>;
    commentOperation = this.RedBenchService.postInvoiceEmail(this.modelr)
    commentOperation.subscribe(
      results => {

        this.modelr = results;
        console.log(this.modelr);
        this.toastr.success('success', 'Invoice  sent Successfully');
        this.router.navigate(['/Invoice']);

      },
      err => {

      });
  }
  updateInvoice() {

    if (this.myForm.value.InvoiceDate.formatted == undefined) {
      this.myForm.value.InvoiceDate.formatted = this.modelr.InvoiceDate;

    }
    if (this.myForm.value.InvoiceDueDate.formatted == undefined) {
      this.myForm.value.InvoiceDueDate.formatted = this.modelr.InvoiceDueDate;

    }
    if (this.myForm.value.InvoiceDate.formatted <= this.myForm.value.InvoiceDueDate.formatted) {
      this.isLoading = true;
      if (this.myForm.value.InvoiceDate.formatted != undefined) {
        this.modelr.InvoiceDate = this.myForm.value.InvoiceDate.formatted;
      }
      if (this.myForm.value.InvoiceDueDate.formatted != undefined) {
        this.modelr.InvoiceDueDate = this.myForm.value.InvoiceDueDate.formatted;
      }
      // if(this.myForm.value.InvoiceDate<=this.myForm.value.InvoiceDueDate) {
      let commentOperation: Observable<InvoiceResult>;
      commentOperation = this.RedBenchService.updateInvoice(this.modelr.Id, this.modelr)
      commentOperation.subscribe(
        results => {

          this.modelr = results;
          console.log(this.modelr);
          this.toastr.success('Success', 'Invoice Updated Successfully ');
          //  this.router.navigate(['/Invoice']);
          location.reload();

        },
        err => {
          this.isLoading = false;

        });
    }
    else {
      this.toastr.warning('', ' You have enter Invoice Due Date is lower than Invoice  Date.Please change and save!');
    }
  }
}
