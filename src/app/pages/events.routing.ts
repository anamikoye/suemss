import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventComponent } from './new-event/new-event.component';
import { MyEventComponent } from './my-event/my-event.component';
import { SampleEventComponent } from './sample-event/sample-event.component';

const routes: Routes = [
    {
        path: 'new',
        component: NewEventComponent,
        data: {
            title: 'Create an Event'
        }
    },
    {
        path: 'my-events',
        component: MyEventComponent,
        data: {
            title: 'Planned Events'
        },
    },
    {
        path: 'sample/:eventId',
        component: SampleEventComponent,
        data: {
            title: 'Planned Events'
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EventRouting {}
