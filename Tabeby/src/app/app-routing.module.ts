// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { DoctorAppointmentComponent } from './components/doctor-appointment/doctor-appointment.component';
import { PatientComponent } from './pages/patient/patient.component';
import { AdminComponent } from './components/admin/admin.component';

import { authGuard } from './guards/auth.guard';

import { VerifyOtpResetComponent } from './components/verify-otp-reset/verify-otp-reset.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { DoctorBookingComponent } from './components/doctor-booking/doctor-booking.component';

const routes: Routes = [
  // الصفحة الافتراضية
  { path: '', redirectTo: '/contact-us', pathMatch: 'full' },
  // الصفحات العامة
  { path: 'contact-us', component: ContactUsComponent },
  // صفحات الدخول والتسجيل
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  { path: 'verify-otp', component: VerifyOtpComponent, canActivate: [authGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [authGuard] },
  { path: 'reset-password', component: ResetPasswordComponent , canActivate: [authGuard]},
  { path: 'verify-otp-reset', component: VerifyOtpResetComponent , canActivate: [authGuard] },
  { path: 'doctor', component: DoctorComponent, canActivate: [authGuard] },
  { path: 'doctors', component: DoctorAppointmentComponent },
  { path: 'about-us', component: AboutUsComponent },
  {path : 'patient', component:PatientComponent  },
  {path : 'admin', component:AdminComponent  },
  {path:'booking',component:DoctorBookingComponent},
  { path: '**', redirectTo: '/contact-us' },
  { path: 'booking/:id', component: DoctorBookingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
