import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Component({

    templateUrl: 'sampleinvoice.component.html'

})
export class SampleinvoiceComponent {
    //    public invoiceForm: FormGroup;


    constructor(private http: Http) { };
    // title = 'ASP.NET MVC 5 with Angular 2';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    invoice: Invoice = {

        customer: {
            CustomerName: "Lorem Ipsum",
            Address: "102/102 East Hills Road",
            Suburb: "East Hills",
            State: "NT",
            PostCode: "3563"
        },
        products: [
            {
                id: "1",
                desc: "Mig Mac",
                unit_price: 8.5,
                quantity: 5
            },
            {
                id: "2",
                desc: "Fillet O Fish",
                unit_price: 4.50,
                quantity: 3
            },
            {
                id: "3",
                desc: "Icecreme",
                unit_price: 0.5,
                quantity: 10
            }

        ]
    }
    invoice2: Invoice;
    getTotal = function () {
        var total = 0;
        for (var i = 0; i < this.invoice.products.length; i++) {
            total += this.invoice.products[i].unit_price * this.invoice.products[i].quantity;
        }
        return total;
    }
    onSubmit() {
        this.create().then(i => {
            this.invoice2 = i;
            console.log(this.invoice2);
        });
    }
    create(): Promise<Invoice> {
        console.log("POST");
        let url = "/Invoice/Create";
        return this.http.post(url, this.invoice).toPromise()
            .then(res => { return res.json() as Invoice });

    }
};
export class Invoice {
    customer: Customer;
    products: Item[];
}

export class Customer {
    CustomerName: String;
    Address: String;
    Suburb: String;
    State: String;
    PostCode: String;

}

export class Item {
    id: String;
    desc: String;
    unit_price: Number;
    quantity: Number;
}



















// }

