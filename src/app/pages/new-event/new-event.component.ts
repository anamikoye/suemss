import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { FormsModule, NgForm, FormGroup, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Event, Upload, Ticket } from '../event';
import { UploadService } from '../upload.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit, AfterViewChecked {

  time = { hour: 13, minute: 30 };
  meridian = true;
  public componentData1: any = '';

  db: any;

  @ViewChild('eventForm') currentForm: NgForm;
  eventForm: NgForm;
  currentUpload: Upload;
  selectedFiles: FileList;
  ticketForm: FormGroup;


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
    tickets: '',
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

  constructor(af: AngularFireDatabase, timeConfig: NgbTimepickerConfig, private upSvc: UploadService, private _fb: FormBuilder, private router: Router) {

    timeConfig.seconds = false;
    firebase.initializeApp(environment.firebase);
    this.categories$ = af.list('/categories').snapshotChanges();
    this.eventsRef = af.list('/events');
    this.db = af;
  }

  // createTicket() {
  //   this.ticketForm = this._fb.group({
  //     ticket_title: [''],
  //     ticket_description: [''],
  //     ticket_price: [''],
  //     quantity_available: ['']
  //   })
  // }

  ngOnInit() {
    this.ticketForm = this._fb.group({
      tickets: this._fb.array([
        this.initTicket()
      ])
    })
  }

  initTicket() {
    return this._fb.group({
      ticket_title: ['', Validators.required],
      ticket_price: [''],
      quantity_available: ['']
  });
  }

  addTicket() {
    const control = <FormArray>this.ticketForm.controls['tickets'];
    control.push(this.initTicket());
  }

  removeTicket(i: number) {
    const control = <FormArray>this.ticketForm.controls['tickets'];
    control.removeAt(i);
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

    console.log(JSON.stringify(this.ticketForm.value));
  }

  createEvent(event: Event) {
    event = this.event$;
    this.router.navigate(['/events/my-events']);
    // this.eventsRef.push(event);
    return this.eventsRef.push(event).key;
  }

  onSubmit(): void {
    console.log('well I tried')
    this.event$ = this.eventForm.value;
    const pushKey = this.createEvent(this.eventForm.value);
    console.log(pushKey);
    this.uploadSingle(pushKey);
    this.pushTickets(pushKey);
    // this.eventForm.reset();
  }

  // File Upload
  detectFiles(event) {
    this.selectedFiles = event.target.files;
    // console.log('file detected');
  }

  pushTickets(eventKey: any) {
    // Find a way to reference the db
    console.log('tried to push a ticket')
    this.db.object(`events/${eventKey}/tickets`).set(this.ticketForm.value.tickets);
  }

  uploadSingle(pushKey: any) {
    const file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload, pushKey)
  }

  autoCompleteCallback1(selectedData: any) {
    //  do any necessery stuff.
    this.componentData1 = JSON.stringify(selectedData);
}


}
