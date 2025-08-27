import { TestBed } from '@angular/core/testing';

import { BookingGoogleService } from './booking-google.service';

describe('BookingGoogleService', () => {
  let service: BookingGoogleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingGoogleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
