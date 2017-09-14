import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingpreviewComponent } from './sendingpreview.component';

describe('SendingpreviewComponent', () => {
  let component: SendingpreviewComponent;
  let fixture: ComponentFixture<SendingpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendingpreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
