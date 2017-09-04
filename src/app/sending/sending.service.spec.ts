/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SendingService } from './sending.service';

describe('SendingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendingService]
    });
  });

  it('should ...', inject([SendingService], (service: SendingService) => {
    expect(service).toBeTruthy();
  }));
});
