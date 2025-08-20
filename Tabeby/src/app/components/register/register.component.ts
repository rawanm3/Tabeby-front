import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  currentStep = 1;
  totalSteps = 4;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  // Step forms
  personalForm: FormGroup;
  roleForm: FormGroup;
  roleSpecificForm: FormGroup;
  reviewForm: FormGroup;
  registrationStatus: 'pending' | 'successful' | null = null;
  
 certificateFile: File | null = null;
 previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.personalForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required, this.ageValidator]]
    }, { validators: this.passwordMatchValidator });

    this.roleForm = this.fb.group({
      role: ['', [Validators.required]]
    });

    // Add these fields to the roleSpecificForm initialization
   this.roleSpecificForm = this.fb.group({
   specialty: [''],
   description: [''],
   title: [''],
   price: [''],
   certificate: [null],
   // New patient-specific fields
   medicalHistory: ['', [Validators.maxLength(1000)]],
   allergies: ['', [Validators.maxLength(500)]],
   currentMedications: ['', [Validators.maxLength(500)]],
   emergencyContact: ['', [Validators.pattern(/^[0-9+\-\s()]+$/), Validators.minLength(10)]],
   bloodType: ['', [Validators.pattern(/^(A|B|AB|O)[+-]$/i)]]
   });
   this.reviewForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.setupFormListeners();
    this.updateRoleSpecificValidators(this.roleForm.get('role')?.value);
  }

  private setupFormListeners() {
    this.roleForm.get('role')?.valueChanges.subscribe(role => {
      this.updateRoleSpecificValidators(role);
    });
  }

  private updateRoleSpecificValidators(role: string) {
    const specialty = this.roleSpecificForm.get('specialty');
    const description = this.roleSpecificForm.get('description');
    const title = this.roleSpecificForm.get('title');
    const price = this.roleSpecificForm.get('price');
    const certificate = this.roleSpecificForm.get('certificate');

    // Reset all validators
    [specialty, description, title, price, certificate].forEach(control => {
      if (control) control.clearValidators();
    });

    // Set validators based on role
    if (role === 'doctor' || role === 'nurse') {
      specialty?.setValidators([Validators.required, Validators.minLength(3)]);
      description?.setValidators([Validators.required, Validators.minLength(10)]);
      price?.setValidators([Validators.required, Validators.min(0)]);
      
      if (role === 'doctor') {
        title?.setValidators([Validators.required, Validators.minLength(2)]);
      }
      
      
      certificate?.setValidators([Validators.required]);
    }

    // Update validity
    [specialty, description, title, price, certificate].forEach(control => {
      if (control) control.updateValueAndValidity();
    });
    
  }

  // Validators
  private passwordValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    return valid ? null : { passwordStrength: true };
  }

  private passwordMatchValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  private ageValidator(control: AbstractControl): {[key: string]: any} | null {
    if (!control.value) return null;
    
    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 18 ? null : { underAge: true };
  }

  nextStep() {
   if (this.isCurrentStepValid()) {
      this.clearMessages();
      this.currentStep++;
   } else {
      // Debug: log invalid controls
      const form = this.getCurrentForm();
      Object.keys(form.controls).forEach(key => {
      if (form.controls[key].invalid) {
        console.log(`Invalid control: ${key}`, form.controls[key].errors);
      }
      });
    }
  }

  previousStep() {
    this.clearMessages();
    this.currentStep--;
  }

  isCurrentStepValid(): boolean {
    if (this.currentStep === 1) return this.personalForm.valid;
    if (this.currentStep === 2) return this.roleForm.valid;
    if (this.currentStep === 3) {
      const role = this.roleForm.get('role')?.value;
      if (role === 'patient') return true;         // مفيش حقول إجبارية للمريض
      return this.roleSpecificForm.valid;          // Doctor/Nurse لازم كل المطلوب يتم
    }
    return true;
  }

  getCurrentForm(): FormGroup {
    switch (this.currentStep) {
      case 1: return this.personalForm;
      case 2: return this.roleForm;
      case 3: return this.roleSpecificForm;
      case 4: return this.reviewForm;
      default: return this.personalForm;
    }
  }

  onFileSelected(event: any) {
   const file = event.target.files?.[0] || null;
   this.certificateFile = file;

   // اربطي الملف بالـ FormControl عشان الفورم يعرف إنه اتملأ
   const ctrl = this.roleSpecificForm.get('certificate');
   ctrl?.setValue(file);
   ctrl?.markAsTouched();
   ctrl?.updateValueAndValidity();

   // لو صورة اعملي Preview
   if (file && file.type.startsWith('image/')) {
     const reader = new FileReader();
     reader.onload = () => { this.previewUrl = reader.result; };
     reader.readAsDataURL(file);
   } else {
     this.previewUrl = null;
   }
  }

  removeFile() {
   this.certificateFile = null;
   this.previewUrl = null;
   const ctrl = this.roleSpecificForm.get('certificate');
   ctrl?.reset();
  }

  // Get combined form data
  getCombinedFormData() {
    const personalData = this.personalForm.value;
    const roleData = this.roleForm.value;
    const roleSpecificData = this.roleSpecificForm.value;

    return {
      ...personalData,
      ...roleData,
      ...roleSpecificData
    };
  }

  // Submit registration
 
  onSubmit() {
   if (this.isCurrentStepValid() && this.currentStep === this.totalSteps) {
     this.isLoading = true;
     this.clearMessages();

     const formData = new FormData();
     const combinedData = this.getCombinedFormData();

     Object.entries(combinedData).forEach(([key, value]) => {
       // لا ترسل certificate إلا لو فيه ملف فعلي
       if (key === 'certificate') return;
       if (value !== null && value !== undefined && value !== '') {
         formData.append(key, value as string);
       }
     });

     // فقط لو فيه ملف فعلي
     if (this.certificateFile) {
       formData.append('certificate', this.certificateFile);
     }

     this.authService.register(formData).subscribe({
       next: (res) => {
         this.isLoading = false;
         this.successMessage = 'Registration successful! Please check your email for verification.';
         const email = this.personalForm.value.email;
        localStorage.setItem('pendingEmail', email);
        this.router.navigate(['/verify-otp']);
       },
       error: (err) => {
         this.isLoading = false;
         this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
       }
     });
    }
  }

  private clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Helper methods for template
  get progressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

 getSmallProgress(stepNumber: number): number {
   if (this.currentStep > stepNumber) {
     return 100; // الشريط مكتمل
   } else if (this.currentStep === stepNumber) {
     return 100; // لسه نصه مكتمل (ممكن تغيري النسبة حسب ما تحبي)
   } else {
     return 0; // لسه ما اشتغلش
   }
 }

  get stepTitle(): string {
   switch (this.currentStep) {
     case 1: return 'Personal Information';
     case 2: return 'Select Your Role';
     case 3: return 'Role-Specific Details';
     case 4: return this.registrationStatus === 'successful' ? 'Registration Successful' : 'Registration Pending';
     default: return '';
   }
  }

  get isDoctor(): boolean {
    return this.roleForm.get('role')?.value === 'doctor';
  }

  get isNurse(): boolean {
    return this.roleForm.get('role')?.value === 'nurse';
  }

  get isPatient(): boolean {
    return this.roleForm.get('role')?.value === 'patient';
  }

  // Form getters for template
  get personalControls() {
    return this.personalForm.controls;
  }

  get roleControls() {
    return this.roleForm.controls;
  }

  get roleSpecificControls() {
    return this.roleSpecificForm.controls;
  }
}
