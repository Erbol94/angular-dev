import { TestBed } from '@angular/core/testing';

import { VgkServiceService } from './vgk-service.service';

describe('VgkServiceService', () => {
  let service: VgkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VgkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
