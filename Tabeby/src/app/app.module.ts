import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
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
import { DoctorCardComponent } from './components/doctor-card/doctor-card.component';
import { DoctorAppointmentComponent } from './components/doctor-appointment/doctor-appointment.component';
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

// import { DoctorFilterPipe } from './doctor-filter.pipe';
//import { DoctorListComponent } from './doctor-list/doctor-list.component';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { HeaderComponent } from './components/header/header.component';
// import { HomeComponent } from './components/home/home.component';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { LoginComponent } from './components/login/login.component';
// import { AuthInterceptor } from './interceptors/auth.interceptor';
// import { RegisterComponent } from './components/register/register.component';
// import { PaymentComponent } from './components/payment/payment.component';
// import { FooterComponent } from './components/footer/footer.component';
// import { AboutUsComponent } from './components/about-us/about-us.component';
// import { ContactUsComponent } from './components/contact-us/contact-us.component';
// import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
// import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
// import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

=======
import { DoctorComponent } from './pages/doctor/doctor.component';
import { NurseComponent } from './pages/nurse/nurse.component';
import { PatientComponent } from './pages/patient/patient.component';
>>>>>>> origin/hany

@NgModule({
   declarations: [
    AppComponent,
    //DoctorListComponent,
    DoctorFilterPipe,
  DoctorListComponent,
  SidebarComponent,
  DoctorCardComponent,
  DoctorAppointmentComponent,
  SortingDropdownComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }