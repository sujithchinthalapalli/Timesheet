import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/modal';
import { MyprofileRoutingModule } from './myprofile-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { MyprofileComponent } from './myprofile.component';
import { MyprofileViewComponent } from './myprofileview.component';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { ImageCropperModule } from 'ng2-img-cropper';
import { LaddaModule } from 'angular2-ladda';
@NgModule({
  imports: [
    MyprofileRoutingModule,
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
    MyprofileComponent, MyprofileViewComponent
  ]
})
export class MyprofileModule { }
