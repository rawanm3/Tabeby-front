import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DoctorBookingComponent } from './components/doctor-booking/doctor-booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoctorBookingComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
