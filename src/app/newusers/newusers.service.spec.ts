import { TestBed, inject } from '@angular/core/testing';

import { NewusersService } from './newusers.service';

describe('NewusersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewusersService]
    });
  });

  it('should be created', inject([NewusersService], (service: NewusersService) => {
    expect(service).toBeTruthy();
  }));
});
