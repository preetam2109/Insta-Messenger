import { TestBed } from '@angular/core/testing';

import { RestaurantGetTop8ItemsService } from './restaurant-get-top-8-items.service';

describe('RestaurantGetTop8ItemsService', () => {
  let service: RestaurantGetTop8ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantGetTop8ItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
