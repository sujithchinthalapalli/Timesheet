import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ForgetComponent } from './forget.component';
import { ResetComponent } from './reset.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Example Pages'
    },
    children: [

      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'forget',
        component: ForgetComponent,
        data: {
          title: 'Forget Page'
        }
      },
      {
        path: 'reset',
        component: ResetComponent,
        data: {
          title: 'reset Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
