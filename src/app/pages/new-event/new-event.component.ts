import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbTimepickerConfig, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabase , AngularFireAction  } from 'angularfire2/database';
import { Event } from '../event';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit, AfterViewChecked {

  time = {hour: 13, minute: 30};
  meridian = true;

  @ViewChild('eventForm') currentForm: NgForm;
  eventForm: NgForm;


  event: Event = {
    id: '',
    title: '',
    location: '',
    date: '',
    start_time: '',
    end_time: '',
    description: '',
    type: '',
    category: '',
    tags: '',
    link: '',
    link_fb: '',
    link_tw: '',
  }

  // size$: BehaviorSubject<string|null>;
  categories$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  event$: FirebaseListObservable<Event[]>
  fireCategories: any;
  eventsRef: any;
  // categories = ['Information Technology', 'Financial Economics', 'Commerce', 'Law'];

  // SampleEvent = new Event (1, 'SpellCast', 'Nairobi', '10/9/2017', '0800', ' 0900', 'tech', false, 'sdgfd', 'sdh', true, 'jsdgd', 'jsads');

  toggleMeridian() {
      this.meridian = !this.meridian;
  }


  constructor( af: AngularFireDatabase, timeConfig: NgbTimepickerConfig ) {

    // this.fireCategories= af.list('/list')
    // this.fireCategories = af.list('/categories');
    timeConfig.seconds = false;
    // this.size$ = new BehaviorSubject(null);
    this.categories$ = af.list('/categories' ).snapshotChanges();
    this.eventsRef = af.list('/events');
   }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.formChanged();
}

  formChanged() {
    if (this.currentForm === this.eventForm) { return; }
    this.eventForm = this.currentForm;
    if (this.eventForm) {
        this.eventForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }
}

  onValueChanged(data?: any) {
    if (!this.eventForm) { return; }
    const form = this.eventForm.form;
    // console.log(form);

    console.log(JSON.stringify(form.value));
}

  createEvent(event: Event) {
    event = this.event$;
    this.eventsRef.push(event);
    // console.log('real hard');
  }

  onSubmit (): void {
    console.log('well I tried')
    this.event$ = this.eventForm.value;
    this.createEvent(this.eventForm.value);
  }


}
