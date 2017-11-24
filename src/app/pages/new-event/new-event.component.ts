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
  public userSettings: any = {
    showRecentSearch: false,
    showSearchButton: false,
    // geoCountryRestriction: ['ke'],
    geoTypes: ['establishment'],
    geoLocation: [-1.310018, 36.812513],
    geoRadius: 10,
    inputPlaceholderText: 'Where your event will be held'
    // searchIconUrl: 'http://downloadicons.net/sites/default/files/identification-search-magnifying-glass-icon-73159.png'
  };

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

  categories$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  event$: FirebaseListObservable<Event[]>
  fireCategories: any;
  eventsRef: any;

  constructor(af: AngularFireDatabase, timeConfig: NgbTimepickerConfig, private upSvc: UploadService, private _fb: FormBuilder, private router: Router) {

    timeConfig.seconds = false;
    firebase.initializeApp(environment.firebase);
    this.categories$ = af.list('/categories').snapshotChanges();
    this.eventsRef = af.list('/events');
    this.db = af;
  }

  ngOnInit() {
    this.ticketForm = this._fb.group({
      tickets: this._fb.array([
        this.initTicket()
      ])
    })
  }

  // Ticketing
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

  // Form Monitoring
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
  }

  // Event Creation
  createEvent(event: Event) {
    event = this.event$;
    setTimeout(() => this.router.navigate(['/events/my-events']), 2000);
    // this.router.navigate(['/events/my-events']);
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
    this.db.object(`events/${eventKey}/location`).set(this.componentData1);
  }

  uploadSingle(pushKey: any) {
    const file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload, pushKey)
  }

  getCodeHtml(data: any): any {
    let _temp: any = JSON.stringify(data);
    _temp = _temp.split(',').join(',<br>');
    _temp = _temp.split('{').join('{<br>');
    _temp = _temp.split('}').join('<br>}');
    return _temp;
  }

  autoCompleteCallback1(selectedData: any) {
    //  do any necessery stuff.
    this.componentData1 = selectedData;
}


}
