import { TestBed, inject } from '@angular/core/testing';

import { EdittemplateService } from './edittemplate.service';

describe('EdittemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdittemplateService]
    });
  });

  it('should be created', inject([EdittemplateService], (service: EdittemplateService) => {
    expect(service).toBeTruthy();
  }));
});
