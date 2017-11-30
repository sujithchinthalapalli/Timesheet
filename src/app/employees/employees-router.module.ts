import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Guards/auth.guard';
import { EmployeesComponent } from './employees.component';
import { EmployeeViewComponent } from './employeeview.component';
import { EmployeeActiveComponent } from './employeeactive.component';
import { EmployeeInactiveComponent } from './employeeinactive.component';
const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    data: {
      title: 'Employees'
    }
  },
  {
    path: 'employeeview',

    data: {
      title: 'View'
    },
    children: [
      {
        path: ':id',
        component: EmployeeViewComponent,
        data: {
          title: 'View'
        }
      },
    ]
  },
  {
    path: 'employeeactive',
    component: EmployeeActiveComponent,
    data: {
      title: 'ActiveEmployees'
    },
  },
  {
    path: 'employeeinactive',
    component: EmployeeInactiveComponent,
    data: {
      title: 'InactiveEmployees'
    },
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
