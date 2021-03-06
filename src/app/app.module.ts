import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TagInputModule } from 'ngx-chips';
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { NgxPaginationModule } from 'ngx-pagination';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'environments/environment';

// Auth
import { AuthService } from './authentication/auth.service';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'suemss'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    NgxPaginationModule,
    Ng4GeoautocompleteModule.forRoot(),
    NgxQRCodeModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    RegisterComponent,
    LoginComponent,
    // DashboardComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }, AuthService],

  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class AppModule { }
