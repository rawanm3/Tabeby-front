import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.isLoading = true;
    const email = this.forgotForm.value.email;

    this.authService.forgotPassword({ email }).subscribe({
      next: () => {
        this.isLoading = false;
        // نخزن الإيميل عشان verify
        sessionStorage.setItem('pendingEmail', email);

        // نروح verify otp
        this.router.navigate(['/verify-otp']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert(err.error.message || 'Failed to send OTP');
      }
    });
  }}