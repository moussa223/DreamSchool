import { TestBed } from '@angular/core/testing';

import { PeriodSetupService } from './period-setup.service';

describe('PeriodSetupService', () => {
  let service: PeriodSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
