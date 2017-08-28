import { TestBed, inject } from '@angular/core/testing';

import { SendUpdateService } from './send-update.service';

describe('SendUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendUpdateService]
    });
  });

  it('should be created', inject([SendUpdateService], (service: SendUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
