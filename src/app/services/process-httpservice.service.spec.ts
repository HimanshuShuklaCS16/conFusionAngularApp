import { TestBed } from '@angular/core/testing';

import { ProcessHTTPserviceService } from './process-httpservice.service';

describe('ProcessHTTPserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessHTTPserviceService = TestBed.get(ProcessHTTPserviceService);
    expect(service).toBeTruthy();
  });
});
