import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading$ = this.authService.isLoading$;
  errorMessage: string = '';
  showPassword: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  if (this.authService.isAuthenticated()) {
    this.router.navigate(['/contact-us']);
  }
  this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',  [Validators.required, Validators.minLength(7)]],
      rememberMe: [false]
    });
  }
    private passwordValidator(control: AbstractControl): {[key: string]: any} | null {
      const value = control.value;
      if (!value) return null;
  
      const hasNumber = /[0-9]/.test(value);
      // const hasUpper = /[A-Z]/.test(value);
      // const hasLower = /[a-z]/.test(value);
      // const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
      const valid = hasNumber ;
      return valid ? null : { passwordStrength: true };
    }
  
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this.errorMessage = '';
      
  //     this.authService.login(this.loginForm.value)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe({
  //         next: (response) => {
  //           // Navigate based on user role
  //           const user = response.user;
  //           if (user.role === 'admin') {
  //             this.router.navigate(['/admin']);
  //           } else {
  //             this.router.navigate(['/']);
  //           }
  //         },
  //         error: (error) => {
  //           this.errorMessage = error.error?.message || 'Login failed. Please try again.';
  //         }
  //       });
  //   } else {
  //     this.markFormGroupTouched();
  //   }
  // }
  
  onSubmit(): void {
  if (this.loginForm.valid) {
    this.errorMessage = '';
    
    this.authService.login(this.loginForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          // هنا بتجيبي بيانات الـ user من الـ response
          const user = response.user;
          if (user?.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      });
  } else {
    this.markFormGroupTouched();
  }
}


  // onSocialLogin(provider: string): void {
  //   // Implement social login
  //   console.log(Social login with ${provider});
  // }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }


}