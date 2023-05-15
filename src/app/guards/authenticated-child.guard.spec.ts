import { TestBed } from '@angular/core/testing';

import { AuthenticatedChildGuard } from './authenticated-child.guard';

describe('AuthenticatedChildGuard', () => {
  let guard: AuthenticatedChildGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticatedChildGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
