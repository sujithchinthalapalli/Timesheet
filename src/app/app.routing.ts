import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { AuthGuard } from './Guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',

  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',


        canActivate: [AuthGuard]
      },
      {
        path: 'timesheet',
        loadChildren: './timesheet/timesheet.module#TimesheetModule',
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule',
      },


      {
        path: 'Invoice',
        loadChildren: './invoice/invoice.module#InvoiceModule'
      },
      {
        path: 'employees',
        loadChildren: './employees/employees.module#EmployeesModule',
      },
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
