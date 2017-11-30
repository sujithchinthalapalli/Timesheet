import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Guards/auth.guard';
import { InvoiceComponent } from './invoice.component';
import { InvoiceCreateComponent } from './invoicecreate.component';
// import{InvoiceEmailComponent} from './invoiceemail.component';
import { InvoiceProductComponent } from './invoiceproduct.component';
import { SampleinvoiceComponent } from './sampleinvoice.component';
const routes: Routes = [
  {

    path: '',
    data: {
      title: 'Invoice'
    },
    children: [
      {
        path: '',
        component: InvoiceComponent,
        data: {
          title: ''
        },
      },

      {
        path: 'InvoiceCreate',
        component: InvoiceCreateComponent,
        data: {
          title: 'InvoiceCreate'
        }
      },
      {
        path: 'sampleinvoice',
        component: SampleinvoiceComponent,
        data: {
          title: 'sampleinvoice'
        }
      },


      {
        path: 'invoiceProduct',
        component: InvoiceProductComponent,
        data: {
          title: 'InvoiceProducts'
        }
      },
      {
        path: 'invoiceProduct',
        data: {
          title: 'InvoiceProducts'
        },
        children: [
          {
            path: ':id',
            component: InvoiceProductComponent,

            data: {
              title: 'InvoiceProducts'
            }
          }
        ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {


}


