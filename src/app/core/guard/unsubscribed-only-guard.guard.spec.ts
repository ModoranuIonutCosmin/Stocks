import { TestBed } from '@angular/core/testing';

import { UnsubscribedOnlyGuardGuard } from './unsubscribed-only-guard.guard';

describe('UnsubscribedOnlyGuardGuard', () => {
  let guard: UnsubscribedOnlyGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnsubscribedOnlyGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
