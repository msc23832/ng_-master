/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditsysemailComponent } from './editsysemail.component';

describe('EditsysemailComponent', () => {
  let component: EditsysemailComponent;
  let fixture: ComponentFixture<EditsysemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsysemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsysemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
