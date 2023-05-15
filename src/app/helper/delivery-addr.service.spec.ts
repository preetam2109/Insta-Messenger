import { TestBed } from '@angular/core/testing';

import { DELIVERYADDRService } from './delivery-addr.service';

describe('DELIVERYADDRService', () => {
  let service: DELIVERYADDRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DELIVERYADDRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
