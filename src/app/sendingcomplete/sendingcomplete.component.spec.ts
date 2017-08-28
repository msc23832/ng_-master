import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingcompleteComponent } from './sendingcomplete.component';

describe('SendingcompleteComponent', () => {
  let component: SendingcompleteComponent;
  let fixture: ComponentFixture<SendingcompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendingcompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingcompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
