import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Guards/auth.guard';
import { DayviewComponent } from './dayview.component';
import { DescriptionComponent } from './description.component';
import { WeekviewComponent } from './weekview.component';
import { TimesheetviewComponent } from './timesheetview.component';
import { DayviewmodelComponent } from './dayviewmodel.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ReportsComponent } from './Reports.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Timesheet'
    },
    children: [
      {
        path: 'dayview',
        component: DayviewComponent,
        data: {
          title: 'Dayview'
        }
      },
      {
        path: 'weekview',
        component: WeekviewComponent,
        data: {
          title: 'Weekview'
        }
      },
      {
        path: 'timesheetview',
        data: {
          title: 'Timesheetview'
        },
        children: [
          {
            path: ':id',
            component: TimesheetviewComponent,
            data: {
              title: 'Timesheetview'
            }
          },
        ]
      },
      {
        path: 'description',
        data: {
          title: 'Description'
        },
        children: [
          {
            path: ':id',
            component: DescriptionComponent,
            data: {
              title: 'Description'
            }
          },
        ]
      },
      {
        path: 'dayviewmodel',
        component: DayviewmodelComponent,
        data: {
          title: 'Dayview Creation'
        }
      },
      {
        path: 'reports',
        component: ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
