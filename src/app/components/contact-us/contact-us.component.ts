import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService, TopRated } from 'src/app/services/review.service';
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
    topDoctors: TopRated[] = [];
  topNurses: TopRated[] = [];
    
  constructor(private authService: AuthService,private specialtyService: SpecialtyService,private reviewService: ReviewService,private router:Router ) {}
  

  loadSpecialties(type: 'doctors' | 'nurses') {
  this.activeTab = type;
  const loader = type === 'doctors' 
    ? this.specialtyService.getDoctorSpecialties() 
    : this.specialtyService.getNurseSpecialties();

  loader.subscribe(data => {
    this.specialties = data;
  });
}





  loadTopDoctors() {
    this.reviewService.getTopDoctors().subscribe(data => {
      console.log('Top Doctors:', data); // ✅ شوفي هنا البيانات راجعة ولا لأ
      this.topDoctors = data;
    });
  }

  loadTopNurses() {
    this.reviewService.getTopNurses().subscribe(data => {
      console.log('Top Nurses:', data); // ✅ شوفي هنا البيانات راجعة ولا لأ
      this.topNurses = data;
    });
  }


  ngOnInit(): void {
    this.loadTopDoctors();
    this.loadTopNurses();
    this.loadSpecialties('doctors');
    this.authService.currentUser$.subscribe((u) => {
      this.user = u;
    });
  }

  logout() {
    this.authService.logout();
  }
}
