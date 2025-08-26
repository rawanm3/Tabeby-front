import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorFilterService } from 'src/app/services/doctor-filter.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {
  allDoctors: any[] = [];
  filteredDoctors: any[] = [];
  sortedDoctors: any[] = [];

  selectedSorting: string = 'Best Match';

  constructor(
    private doctorService: DoctorFilterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDoctors();

    // استمع ل query params اللي جاية من الهوم
   this.route.queryParams.subscribe(params => {
    this.applyFilter(params);
  });
  }

  // loadDoctors() {
  //   this.doctorService.getAllDoctors().subscribe({
  //     next: (data) => {
  //       this.allDoctors = data;
  //       this.filteredDoctors = [...this.allDoctors];
  //       this.sortDoctors();
  //     },
  //     error: (err) => {
  //       console.error('Error fetching doctors:', err);
  //     }
  //   });
  // }
  loadDoctors() {
  this.doctorService.getAllDoctors().subscribe({
    next: (data) => {
      this.allDoctors = data;
      this.filteredDoctors = [...this.allDoctors];
      this.sortDoctors();

      // ✅ بعد ما اتحملت الدكاترة، طبقي أي params موجودة
      this.route.queryParams.subscribe(params => {
        console.log("🔍 Params from home:", params);
        if (Object.keys(params).length > 0) {
          this.applyFilter(params);
        }
      });
    },
    error: (err) => {
      console.error('Error fetching doctors:', err);
    }
  });
}

     // ✅ دي اللي كانت ناقصة
  onFilterChange(filters: any) {
    this.applyFilter(filters);
  }

  // applyFilter(filters: any) {
  //   this.filteredDoctors = this.allDoctors.filter((doc) => {
  //     let match = true;

  //     if (filters.specialty && !doc.specialty.toLowerCase().includes(filters.specialty.toLowerCase())) {
  //       match = false;
  //     }
  //     if (filters.location && !doc.location.toLowerCase().includes(filters.location.toLowerCase())) {
  //       match = false;
  //     }
  //     if (filters.name && !doc.name.toLowerCase().includes(filters.name.toLowerCase())) {
  //       match = false;
  //     }
  //     if (filters.gender && doc.gender !== filters.gender) {
  //       match = false;
  //     }
  //     if (filters.fee) {
  //       if (filters.fee === 'lt50' && !(doc.price < 50)) match = false;
  //       if (filters.fee === '50-100' && !(doc.price >= 50 && doc.price <= 100)) match = false;
  //       if (filters.fee === '100-200' && !(doc.price >= 100 && doc.price <= 200)) match = false;
  //       if (filters.fee === '200-300' && !(doc.price >= 200 && doc.price <= 300)) match = false;
  //       if (filters.fee === 'gt300' && !(doc.price > 300)) match = false;
  //     }

  //     return match;
  //   });

  //   this.sortDoctors();
  // }
applyFilter(filters: any) {
  this.filteredDoctors = this.allDoctors.filter((doc) => {
    let match = true;

    // ✅ specialty
    if (filters.specialty && !doc.specialty.toLowerCase().includes(filters.specialty.toLowerCase())) {
      match = false;
    }

    // ✅ location
    if (filters.location && !doc.location.toLowerCase().includes(filters.location.toLowerCase())) {
      match = false;
    }

    // ✅ name (من userId)
    if (filters.name && !doc.userId.fullName.toLowerCase().includes(filters.name.toLowerCase())) {
      match = false;
    }

    // ✅ gender (من userId)
    // خليه كده:
if (filters.gender && doc.userId?.gender?.toLowerCase() !== filters.gender.toLowerCase()) {
  match = false;
}

    // ✅ fee
    if (filters.fee) {
      if (filters.fee === 'lt50' && !(doc.price < 50)) match = false;
      if (filters.fee === '50-100' && !(doc.price >= 50 && doc.price <= 100)) match = false;
      if (filters.fee === '100-200' && !(doc.price >= 100 && doc.price <= 200)) match = false;
      if (filters.fee === '200-300' && !(doc.price >= 200 && doc.price <= 300)) match = false;
      if (filters.fee === 'gt300' && !(doc.price > 300)) match = false;
    }

    return match;
  });

  this.sortDoctors();
}

  changeSorting(type: string) {
    this.selectedSorting = type;
    this.sortDoctors();
  }

  sortDoctors() {
    this.sortedDoctors = [...this.filteredDoctors];

    switch (this.selectedSorting) {
      case 'Top Rated':
        this.sortedDoctors.sort((a, b) => b.rating - a.rating);
        break;
      case 'Lowest Price':
        this.sortedDoctors.sort((a, b) => a.price - b.price);
        break;
      case 'Highest Price':
        this.sortedDoctors.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
  }

  hasAvailableSlots(times: any[]): boolean {
    return times && times.some(t => t.available);
  }

  getAvailableSlotCount(times: any[]): number {
    return times.filter(t => t.available).length;
  }

  bookAppointment(doctor: any, slot: any) {
    console.log('Booking doctor:', doctor, 'slot:', slot);
  }
}
