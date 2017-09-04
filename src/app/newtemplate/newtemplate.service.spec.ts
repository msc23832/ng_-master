import { TestBed, inject } from '@angular/core/testing';

import { NewtemplateService } from './newtemplate.service';

describe('NewtemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewtemplateService]
    });
  });

  it('should be created', inject([NewtemplateService], (service: NewtemplateService) => {
    expect(service).toBeTruthy();
  }));
});
