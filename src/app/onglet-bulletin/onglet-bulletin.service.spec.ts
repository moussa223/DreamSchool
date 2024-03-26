import { TestBed } from '@angular/core/testing';

import { OngletBulletinService } from './onglet-bulletin.service';

describe('OngletBulletinService', () => {
  let service: OngletBulletinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OngletBulletinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
