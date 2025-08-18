import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {
 verifyForm!: FormGroup;
  email!: string;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // جلب الايميل من الـ queryParams
  //   this.route.queryParams.subscribe(params => {
  //      this.email = params['email'] || localStorage.getItem('pendingEmail') || '';
  //     if (this.email) {
  //     localStorage.setItem('pendingEmail', this.email); // تحديث الإيميل في localStorage
  //   }
  // //    if (this.authService.isAuthenticated()) {
  // //   this.router.navigate(['/contact-us']);
  // // }
  // this.initializeForm();
  //});
    const email = localStorage.getItem('pendingEmail');
  if (!email) {
    // No pending email → redirect back to login
    this.router.navigate(['/login']);
    return;
  }
   this.email = email;
    // بناء الفورم
    this.verifyForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]]
    });
  }
  initializeForm() {
    throw new Error('Method not implemented.');
  }

  onVerify(): void {
    if (this.verifyForm.invalid) return;

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const otpData = {
      email: this.email,
      otp: this.verifyForm.value.otp
    };

    this.authService.verifyOtp(otpData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'OTP verified successfully! You can now log in.';
        setTimeout(() => {
          localStorage.removeItem('pendingEmail'); // cleanup
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid OTP. Please try again.';
      }
    });
  }
  onResendOtp(): void {
  this.isLoading = true;
  this.successMessage = '';
  this.errorMessage = '';
  this.authService.resendOtp(this.email).subscribe({
    next: (res: { message?: string }) => {
      this.isLoading = false;
      this.successMessage = res.message || 'تم إرسال رمز جديد إلى بريدك الإلكتروني';
    },
    error: (err) => {
      this.isLoading = false;
      this.errorMessage = err.error?.message || 'حدث خطأ أثناء إرسال الرمز';
    }
  });
}
}
