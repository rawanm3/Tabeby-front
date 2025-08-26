import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorFilterPipe } from '../doctor-filter-pipe';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SortingDropdownComponent } from './components/sorting-dropdown/sorting-dropdown.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DoctorBookingComponent } from './components/doctor-booking/doctor-booking.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { NurseComponent } from './pages/nurse/nurse.component';
import { PatientComponent } from './pages/patient/patient.component';
import { DoctorAppointmentComponent } from './components/doctor-appointment/doctor-appointment.component';
import { DoctorCardComponent } from './components/doctor-card/doctor-card.component';
import { ChooseSlotComponent } from './components/choose-slot/choose-slot.component';
import { AdminComponent } from './components/admin/admin.component';
import { NurseBookingComponent } from './components/nurse-booking/nurse-booking.component';
import { VerifyOtpResetComponent } from './components/verify-otp-reset/verify-otp-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorFilterPipe,
    DoctorListComponent,
    DoctorBookingComponent,
    SortingDropdownComponent,
    PatientComponent,
    NurseComponent,
    DoctorComponent,
    RegisterComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    VerifyOtpComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    DoctorAppointmentComponent,
    DoctorCardComponent,
    ChooseSlotComponent,
    AdminComponent,
    LoginComponent,
    NurseBookingComponent,
    VerifyOtpResetComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
