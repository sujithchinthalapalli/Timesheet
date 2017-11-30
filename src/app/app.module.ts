import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

//Guards
import { AuthGuard } from './Guards/auth.guard';

//Service
import { RedBenchService } from './Service/RedBenchService';

import { OAuthService } from 'angular-oauth2-oidc';

import { Angular2SocialLoginModule } from "angular2-social-login";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    OAuthModule.forRoot(),
    ChartsModule,
    CommonModule,
    BrowserAnimationsModule,
    Angular2SocialLoginModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  providers: [AuthGuard,
    RedBenchService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
