import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap';

import { TagInputModule } from 'ngx-chips';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { NgxQRCodeModule } from 'ngx-qrcode2';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewEventComponent } from './new-event/new-event.component';
import { MyEventComponent } from './my-event/my-event.component';
import { SampleEventComponent } from './sample-event/sample-event.component';
import { EventRouting } from './events.routing';

import { UploadService } from './upload.service';

@NgModule({
  imports: [
    CommonModule,
    EventRouting,
    NgbModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    Ng4GeoautocompleteModule.forRoot(),
    NgxQRCodeModule
    // BrowserAnimationsModule
  ],
  declarations: [
    NewEventComponent,
    MyEventComponent,
    SampleEventComponent
  ],
  providers: [
    UploadService
  ]
})
export class EventsModule { }
