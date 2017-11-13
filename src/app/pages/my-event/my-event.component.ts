import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Event, Upload } from '../event';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.scss']
})
export class MyEventComponent implements OnInit {

  events$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(af: AngularFireDatabase, private router: Router) {
    this.events$ = af.list('/events').snapshotChanges();
   }

  ngOnInit() {
  }

  getData(key: any) {
    this.router.navigate(['events/sample', key]);
    // console.log(key);

  }

}
