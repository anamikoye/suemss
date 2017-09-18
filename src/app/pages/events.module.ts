import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TagInputModule } from 'ngx-chips';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewEventComponent } from './new-event/new-event.component';
import { MyEventComponent } from './my-event/my-event.component';
import { EventRouting } from './events.routing';

@NgModule({
  imports: [
    CommonModule,
    EventRouting,
    NgbModule,
    TagInputModule,
    // BrowserAnimationsModule
  ],
  declarations: [
    NewEventComponent,
    MyEventComponent
  ]
})
export class EventsModule { }
