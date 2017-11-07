import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sample-event',
  templateUrl: './sample-event.component.html',
  styleUrls: ['./sample-event.component.scss']
})
export class SampleEventComponent implements OnInit {

  public filter = '';
  p = 1;
  categories = ['Information Technology', 'Financial Economics', 'Commerce', 'Law', 'Information Technology', 'Financial Economics', 'Commerce', 'Law', 'Information Technology', 'Financial Economics', 'Commerce', 'Law'];

  constructor() { }

  ngOnInit() {
  }

}
