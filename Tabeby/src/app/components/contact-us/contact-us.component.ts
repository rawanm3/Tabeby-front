import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorFilterService } from 'src/app/services/doctor-filter.service';
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
    doctors: any[] = [];

  gopatient() {
    this.router.navigate(['/patient']);
  }
  
  constructor(private authService: AuthService,private doctorService: DoctorFilterService,private specialtyService: SpecialtyService,private reviewService: ReviewService,private router:Router ) {}
  

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

     this.loadDoctors();
    //  this.reviewService.getAllDoctors().subscribe((data) => {
    //   console.log("Doctors:", data);
    //   this.doctors = data;
    // });
    this.loadSpecialties('doctors');
    this.authService.currentUser$.subscribe((u) => {
      this.user = u;
    });
  }

  logout() {
    this.authService.logout();
  }
allDoctors: any[] = [];
showAll: boolean = false;
  // تحميل الدكاترة
  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.allDoctors = data;           // خزني كل الدكاترة
        this.doctors = this.allDoctors.slice(0, 4); // أول 4 بس في البداية
        console.log('✅ All Doctors:', data);
      },
      error: (err) => {
        console.error('❌ Error fetching doctors:', err);
      }
    });
  }

  // عرض كل الدكاترة عند الضغط على الزرار
  viewMoreDoctors() {
    this.showAll = true;
    this.doctors = this.allDoctors; // خليها كلها
  }
}
