// نفس ملفك تماماً بدون تعديل
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { DoctorAppointmentComponent } from './components/doctor-appointment/doctor-appointment.component';
import { PatientComponent } from './pages/patient/patient.component';
import { AdminComponent } from './components/admin/admin.component';

import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/contact-us', pathMatch: 'full' },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'doctors', component: DoctorAppointmentComponent },

  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  { path: 'verify-otp', component: VerifyOtpComponent, canActivate: [authGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [authGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [authGuard] },

  { path: 'doctor', component: DoctorComponent, canActivate: [authGuard] },
  { path: 'patient', component: PatientComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '/contact-us' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
