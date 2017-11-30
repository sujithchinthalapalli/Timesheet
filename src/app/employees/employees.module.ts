import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { FormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { SelectModule } from 'ng2-select';
import { ModalModule } from 'ng2-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { EmployeesComponent } from './employees.component';
import { EmployeeViewComponent } from './employeeview.component';
import { EmployeesDetailsComponent } from './employeesdetails.component';
import { EmployeesRoutingModule } from './employees-router.module';
import { EmpFilterPipe } from './emp.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { EmployeeActiveComponent } from './employeeactive.component';
import { EmployeeInactiveComponent } from './employeeinactive.component';
import { LaddaModule } from 'angular2-ladda';
// import { TruncateModule } from 'ng2-truncate';
import { OrderBy } from './capitalizefirst.pipe';

@NgModule({
  imports: [
    EmployeesRoutingModule,
    CommonModule,
    TabsModule,
    FormsModule,
    TextMaskModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NguiAutoCompleteModule,
    DatepickerModule.forRoot(),
    SelectModule,
    ToastrModule.forRoot(),
    Ng2OrderModule,
    LaddaModule
    // TruncateModule
  ],
  declarations: [EmployeesComponent, OrderBy, EmpFilterPipe, EmployeeViewComponent, EmployeesDetailsComponent, EmployeeActiveComponent, EmployeeInactiveComponent]
})
export class EmployeesModule { }
