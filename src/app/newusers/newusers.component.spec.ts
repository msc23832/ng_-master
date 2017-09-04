/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewusersComponent } from './newusers.component';

describe('NewusersComponent', () => {
  let component: NewusersComponent;
  let fixture: ComponentFixture<NewusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
