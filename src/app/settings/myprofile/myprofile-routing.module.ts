import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyprofileComponent } from './myprofile.component';
import { AuthGuard } from '../../Guards/auth.guard';
import { MyprofileViewComponent } from './myprofileview.component';
const routes: Routes = [
  {
    path: '',
    component: MyprofileViewComponent,

    data: {
      title: 'My Profile'
    }


  },
  {
    path: 'Edit',
    component: MyprofileComponent,

    data: {
      title: 'Edit'
    }


  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyprofileRoutingModule { }
