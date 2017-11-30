import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/RX';
import { Invoice, InvoiceResult } from '../Model/Invoice';
import { Invoiceproduct, InvoiceproductResult } from '../Model/Invoiceproduct';
import { RedBenchService } from '../Service/RedBenchService';

@Component({
  templateUrl: 'Invoice.component.html',
  selector: 'data-bind',
  providers: [RedBenchService]
})
export class InvoiceComponent implements OnInit {
  private InvoiceResult: InvoiceResult;
  modelrlist: InvoiceResult[] = [];
  model = new Invoice('', '', '', '', '', '', '', '');
  public modelr = new InvoiceResult('', '', '', '', '', '', '', '', '');
  public Id: string;
  modelplist: Invoiceproduct[] = [];
  modelp = new Invoiceproduct('', '', '', '', '', '', '', '');
  modelrp = new InvoiceproductResult('', '', '', '', '', '', '', '', '');

  constructor(private RedBenchService: RedBenchService, private router: Router) {
    this.InvoiceResult = JSON.parse(localStorage.getItem('invoicelocalstorage'));
    // console.log('myTable constructed'); 
  }
  ngOnInit(): void {

    this.getAllInvoices();

  }
  initPoducts() {

  }

  getAllInvoices() {

    this.RedBenchService.getInvoice().subscribe(

      results => {

        this.modelrlist = results;

      },
      error => {
      });
  }

}