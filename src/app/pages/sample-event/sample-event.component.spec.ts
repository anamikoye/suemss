import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleEventComponent } from './sample-event.component';

describe('SampleEventComponent', () => {
  let component: SampleEventComponent;
  let fixture: ComponentFixture<SampleEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
