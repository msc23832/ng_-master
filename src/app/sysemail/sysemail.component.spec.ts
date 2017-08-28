/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SysemailComponent } from './sysemail.component';

describe('SysemailComponent', () => {
  let component: SysemailComponent;
  let fixture: ComponentFixture<SysemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
