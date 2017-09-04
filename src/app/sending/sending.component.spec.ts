/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SendingComponent } from './sending.component';

describe('SendingComponent', () => {
  let component: SendingComponent;
  let fixture: ComponentFixture<SendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
