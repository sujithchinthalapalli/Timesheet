import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/modal';
import { CompanyprofileRoutingModule } from './companyprofile-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { CompanyprofileComponent } from './companyprofile.component';
import { CompanyprofileViewComponent } from './companyprofileview.component';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { ImageCropperModule } from 'ng2-img-cropper';
import { LaddaModule } from 'angular2-ladda';
@NgModule({
  imports: [
    CompanyprofileRoutingModule,
    CommonModule,
    GooglePlaceModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ImageCropperModule,
    TextMaskModule,
    LaddaModule
  ],
  declarations: [
    CompanyprofileComponent, CompanyprofileViewComponent
  ]
})
export class CompanyprofileModule { }
