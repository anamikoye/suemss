import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventComponent } from './new-event.component';

const routes: Routes = [
    {
        path: '',
        component: NewEventComponent,
        data: {
            title: 'New Event'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class NewEventRouting {}
