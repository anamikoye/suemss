import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEventComponent } from './new-event.component'
import { NewEventRouting } from './new-event.routing';

@NgModule({
  imports: [
    CommonModule,
    NewEventRouting
  ],
  declarations: [ NewEventComponent ]
})
export class NewEventModule { }
