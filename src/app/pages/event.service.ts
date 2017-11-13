import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Event } from './event';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/throw';

@Injectable()
export class EventRetrievalService {
    basePath = 'events';

    constructor(private db: AngularFireDatabase) { }

    getEvent(key: any) {
        return this.db.object(`${this.basePath}/${key}`).valueChanges();
    }

}
