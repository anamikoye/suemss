import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';


import { CalendarModule } from 'angular-calendar';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    // BrowserAnimationsModule,
    CalendarModule.forRoot()
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
