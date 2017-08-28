/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EditsysemailService } from './editsysemail.service';

describe('EditsysemailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditsysemailService]
    });
  });

  it('should ...', inject([EditsysemailService], (service: EditsysemailService) => {
    expect(service).toBeTruthy();
  }));
});
