import { TestBed } from '@angular/core/testing';

import { AccessGuard } from './access.guard';

describe('IsSignedGuard', () => {
  let service: AccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
