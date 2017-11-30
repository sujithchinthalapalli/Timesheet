import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { InvoiceCreateComponent } from './invoicecreate.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TextMaskModule } from 'angular2-text-mask';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import{InvoiceEmailComponent} from './invoiceemail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { SelectModule } from 'ng2-select';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { InvoiceProductComponent } from './invoiceproduct.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ToastrModule } from 'ngx-toastr';
import { InvoiceFilterPipe } from './invoice.pipe';
import { ModalModule } from 'ng2-bootstrap/modal';
import { OrderBy } from './capitalizefirst.pipe';
import { SampleinvoiceComponent } from './sampleinvoice.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { LaddaModule } from 'angular2-ladda';
@NgModule({
  imports: [


    ToastrModule.forRoot(), CommonModule, SelectModule, NguiAutoCompleteModule, InvoiceRoutingModule, TabsModule, TextMaskModule, MyDatePickerModule, ReactiveFormsModule, FormsModule, DatepickerModule.forRoot(), ModalModule.forRoot(), Ng2OrderModule, LaddaModule

  ],
  declarations: [InvoiceComponent, OrderBy, InvoiceCreateComponent, InvoiceProductComponent, InvoiceFilterPipe, SampleinvoiceComponent]
})
export class InvoiceModule { }
