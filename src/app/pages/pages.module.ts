import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ForgetComponent } from './forget.component';
import { ResetComponent } from './reset.component';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { PagesRoutingModule } from './pages-routing.module';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  imports: [ToastrModule.forRoot(), PagesRoutingModule, CommonModule, ReactiveFormsModule, Angular2SocialLoginModule, LaddaModule],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetComponent,
    ResetComponent

  ]
})
export class PagesModule { }
