import { Component, OnInit, Input, AfterViewChecked, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject, AngularFireAction } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { Event, Ticket } from '../event';

import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'app-sample-event',
  templateUrl: './sample-event.component.html',
  styleUrls: ['./sample-event.component.scss']
})
export class SampleEventComponent implements OnInit, AfterViewChecked {

  public largeModal;
  public filter = '';
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: any;
  TicketKey: any;
  event$: Observable<Event[]>;
  tickets$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  ticketUsers$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  p = 1;
  @ViewChild('editEventForm') currentForm: NgForm;
  editEventForm: NgForm;
  categories = ['Information Technology', 'Financial Economics', 'Commerce', 'Law', 'Information Technology', 'Financial Economics', 'Commerce', 'Law', 'Information Technology', 'Financial Economics', 'Commerce', 'Law'];

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.event$ = this.db.object('/events/' + params['eventId']).valueChanges();
      this.tickets$ = this.db.list('/events/' + params['eventId']+'/tickets').snapshotChanges();
   });

   const sub = this.route.params.subscribe(params => {
    this.value = params['eventId']; });

    console.log(this.value);

  }

  getUsers(key: any) {
    this.TicketKey = key;
    this.ticketUsers$ = this.db.list('/events/' + this.value +'/tickets/' + key + '/TicketUsers').snapshotChanges();
  }

  deleteUser(ticketKey: any, userKey: any) {
    const itemRef = this.db.object('/events/' + this.value +'/tickets/' + ticketKey + '/TicketUsers/'+userKey);
    itemRef.remove();
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.editEventForm) { return; }
    this.editEventForm = this.currentForm;
    if (this.editEventForm) {
      this.editEventForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.editEventForm) { return; }
    const form = this.editEventForm.form;
    // console.log(form);

    // console.log(JSON.stringify(form.value));
  }

  onSubmit () {
    console.log('New Form Data: ' + JSON.stringify(this.editEventForm.value))
  }

}
