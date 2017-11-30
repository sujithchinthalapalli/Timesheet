import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyprofileComponent } from './companyprofile.component';
import { AuthGuard } from '../../Guards/auth.guard';
import { CompanyprofileViewComponent } from './companyprofileview.component';
const routes: Routes = [
  {
    path: '',
    component: CompanyprofileViewComponent,

    data: {
      title: 'company Profile'
    }


  },
  {
    path: 'Edit',
    component: CompanyprofileComponent,

    data: {
      title: 'Edit'
    }


  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyprofileRoutingModule { }
