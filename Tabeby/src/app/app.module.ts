import { NgModule } from '@angular/core';
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

// import { DoctorFilterPipe } from './doctor-filter.pipe';
//import { DoctorListComponent } from './doctor-list/doctor-list.component';



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
    FormsModule,
    BrowserAnimationsModule,//لعمل تأثيرات  الرسوم المتحركه 
    MatSidenavModule,//بيستخدم لعمل سيدبار (Side Navigation) يفتح ويقفل
    MatExpansionModule,//بيعمل Expandable Panels (زي Accordion).
    MatCheckboxModule,//عشان تعمل Checkbox (مربع اختيار).
    MatIconModule,//بيوفرلك أيقونات جاهزة (Material Icons).
    MatButtonModule,//بيستخدم لعمل أزرار (Buttons) بتصميم Material.
    MatRadioModule,//بيستخدم لعمل Radio Buttons 
    MatMenuModule//بيستخدم لعمل قوائم منسدلة
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }