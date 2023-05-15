import { TestBed } from '@angular/core/testing';

import { SevagudiServiceService } from './sevagudi-service.service';

describe('SevagudiServiceService', () => {
  let service: SevagudiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SevagudiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
