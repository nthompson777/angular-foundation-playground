import { TestBed, inject } from '@angular/core/testing';

import { ReturnsJsonArrayService } from './returns-json-array.service';

describe('ReturnsJsonArrayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReturnsJsonArrayService]
    });
  });

  it('should be created', inject([ReturnsJsonArrayService], (service: ReturnsJsonArrayService) => {
    expect(service).toBeTruthy();
  }));
});
