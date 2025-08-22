import { TestBed } from '@angular/core/testing';

import { DoctorFilterService } from './doctor-filter.service';

describe('DoctorFilterService', () => {
  let service: DoctorFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
