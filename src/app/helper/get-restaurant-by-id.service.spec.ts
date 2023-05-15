import { TestBed } from '@angular/core/testing';

import { GetRestaurantByIdService } from './get-restaurant-by-id.service';

describe('GetRestaurantByIdService', () => {
  let service: GetRestaurantByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRestaurantByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
