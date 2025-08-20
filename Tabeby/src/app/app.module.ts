
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorFilterPipe } from 'src/doctor-filter-pipe';
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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BookingService } from './services/booking.service';
import { DoctorBookingComponent } from './components/doctor-booking/doctor-booking.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { NurseComponent } from './pages/nurse/nurse.component';
import { PatientComponent } from './pages/patient/patient.component';
import { DoctorAppointmentComponent } from './components/doctor-appointment/doctor-appointment.component';

@NgModule({
   declarations: [
    AppComponent,
    //DoctorListComponent,
    DoctorFilterPipe,
DoctorBookingComponent,
  SortingDropdownComponent,
  PatientComponent,
  NurseComponent
,DoctorComponent , 
    // HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    VerifyOtpComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    DoctorListComponent,
    DoctorAppointmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
