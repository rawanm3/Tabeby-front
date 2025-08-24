import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
   resetForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || sessionStorage.getItem('pendingEmail') || '';
      if (!this.email) {
        // لو مفيش ايميل → رجعه للـ forgot-password
        this.router.navigate(['/forgot-password']);
      }
    });
  }

  onSubmit(): void {
    if (this.resetForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.resetPassword({
      email: this.email,
      newPassword: this.resetForm.value.newPassword
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'تم تغيير كلمة المرور بنجاح 🎉';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'فشل تغيير كلمة المرور';
      }
    });
  }
}

