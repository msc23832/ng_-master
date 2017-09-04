import { TestBed, inject } from '@angular/core/testing';

import { NewsysemailService } from './newsysemail.service';

describe('NewsysemailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsysemailService]
    });
  });

  it('should be created', inject([NewsysemailService], (service: NewsysemailService) => {
    expect(service).toBeTruthy();
  }));
});
