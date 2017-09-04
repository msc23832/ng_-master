import { TestBed, inject } from '@angular/core/testing';

import { EditusersService } from './editusers.service';

describe('EditusersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditusersService]
    });
  });

  it('should be created', inject([EditusersService], (service: EditusersService) => {
    expect(service).toBeTruthy();
  }));
});
