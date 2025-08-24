import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyOtpResetComponent } from './verify-otp-reset.component';

describe('VerifyOtpResetComponent', () => {
  let component: VerifyOtpResetComponent;
  let fixture: ComponentFixture<VerifyOtpResetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyOtpResetComponent]
    });
    fixture = TestBed.createComponent(VerifyOtpResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
