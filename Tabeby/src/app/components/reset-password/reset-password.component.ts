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
      this.email = params['email'] || '';
    });
  }
  onSubmit(): void {
    if (this.resetForm.invalid) return;
    this.isLoading = true;
    this.authService.resetPassword({
      email: this.email,
      newPassword: this.resetForm.value.newPassword
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Password reset successfully!';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Reset failed';
      }
    });
  }
}
