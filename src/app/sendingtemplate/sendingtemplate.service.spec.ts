import { TestBed, inject } from '@angular/core/testing';

import { SendingtemplateService } from './sendingtemplate.service';

describe('SendingtemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendingtemplateService]
    });
  });

  it('should be created', inject([SendingtemplateService], (service: SendingtemplateService) => {
    expect(service).toBeTruthy();
  }));
});
