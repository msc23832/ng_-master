import { TestBed, inject } from '@angular/core/testing';

import { SendingcompleteService } from './sendingcomplete.service';

describe('SendingcompleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendingcompleteService]
    });
  });

  it('should be created', inject([SendingcompleteService], (service: SendingcompleteService) => {
    expect(service).toBeTruthy();
  }));
});
