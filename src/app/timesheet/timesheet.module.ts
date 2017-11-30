import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayviewComponent } from './dayview.component';
import { WeekviewComponent } from './weekview.component';
import { TimesheetviewComponent } from './timesheetview.component';
import { DescriptionComponent } from './description.component';
import { DayviewmodelComponent } from './dayviewmodel.component';
import { TimesheetRoutingModule } from './timesheet-routing.module';
// import { Timeoff, TimeoffResult } from '../model/Timeoff';
// import{IMyDpOptions} from 'mydatepicker';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { FormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule } from '@angular/forms';
// import { MyDatepickerModule } from 'Mydatepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { SelectModule } from 'ng2-select';
import { ModalModule } from 'ng2-bootstrap/modal';
import { ReportsComponent } from './Reports.component';
import { DayviewFilterPipe } from './dayview.pipe';
import { WeekviewFilterPipe } from './weekview.pipe';
import { ToastrModule } from 'ngx-toastr';
import { LaddaModule } from 'angular2-ladda';
// import { TruncateModule } from 'ng2-truncate';

@NgModule({
  imports: [
    TimesheetRoutingModule,
    CommonModule,
    TabsModule,
    FormsModule,
    TextMaskModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NguiAutoCompleteModule,
    // DatepickerModule.forRoot(),
    SelectModule,
    ToastrModule.forRoot(),
    // IMyDpOptions
    MyDatePickerModule,
    LaddaModule

    // TruncateModule
  ],
  declarations: [DayviewComponent, DescriptionComponent, DayviewmodelComponent, WeekviewComponent, TimesheetviewComponent, ReportsComponent, DayviewFilterPipe, WeekviewFilterPipe]
})
export class TimesheetModule { }
