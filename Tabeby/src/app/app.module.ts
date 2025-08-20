import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
=======
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

>>>>>>> origin/hany
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
<<<<<<< HEAD
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

// import { DoctorFilterPipe } from './doctor-filter.pipe';
//import { DoctorListComponent } from './doctor-list/doctor-list.component';


=======
import { DoctorComponent } from './pages/doctor/doctor.component';
import { NurseComponent } from './pages/nurse/nurse.component';
import { PatientComponent } from './pages/patient/patient.component';
>>>>>>> origin/hany

@NgModule({
   declarations: [
    AppComponent,
<<<<<<< HEAD
    //DoctorListComponent,
    DoctorFilterPipe,
  DoctorListComponent,
  SidebarComponent,
  DoctorCardComponent,
  DoctorAppointmentComponent,
  SortingDropdownComponent,
  
=======
    HeaderComponent,
    HomeComponent,
    DoctorComponent,
    NurseComponent,
    PatientComponent
>>>>>>> origin/hany
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatMenuModule
=======
    FormsModule
  ],
  providers: [
    provideClientHydration()
>>>>>>> origin/hany
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }