import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  user: User | null = null;
  specialties: string[] = [];
  activeTab: 'doctors' | 'nurses' = 'doctors';

  constructor(private authService: AuthService,private specialtyService: SpecialtyService) {}
  

  loadSpecialties(type: 'doctors' | 'nurses') {
  this.activeTab = type;
  const loader = type === 'doctors' 
    ? this.specialtyService.getDoctorSpecialties() 
    : this.specialtyService.getNurseSpecialties();

  loader.subscribe(data => {
    this.specialties = data;
  });
}



  ngOnInit(): void {
    this.loadSpecialties('doctors');
    this.authService.currentUser$.subscribe((u) => {
      this.user = u;
    });
  }

  logout() {
    this.authService.logout();
  }
}
