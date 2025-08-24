import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-otp-reset',
  templateUrl: './verify-otp-reset.component.html',
  styleUrls: ['./verify-otp-reset.component.scss']
})
export class VerifyOtpResetComponent {
  verifyForm!: FormGroup;
  email!: string;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = sessionStorage.getItem('pendingEmail');
    if (!email) {
      this.router.navigate(['/forgot-password']);
      return;
    }
    this.email = email;

    this.verifyForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]]
    });
  }

  onVerify(): void {
    if (this.verifyForm.invalid) return;

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.verifyOtpReset({
      email: this.email,
      otp: this.verifyForm.value.otp
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'OTP verified successfully!';
        setTimeout(() => {
          this.router.navigate(['/reset-password'], { queryParams: { email: this.email } });
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid OTP. Please try again.';
      }
    });
  }
}
