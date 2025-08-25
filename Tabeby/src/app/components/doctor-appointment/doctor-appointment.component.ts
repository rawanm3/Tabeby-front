import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor.model';
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

  constructor(private doctorService: DoctorFilterService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.allDoctors = data;
        this.filteredDoctors = [...this.allDoctors];
        this.sortDoctors();
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
      }
    });
  }

  // الفلتر جاي من الـ sidebar
  onFilterChange(filter: any) {
    this.filteredDoctors = this.allDoctors.filter((doc) => {
      return (!filter.specialty || doc.specialty === filter.specialty) &&
             (!filter.location || doc.location === filter.location) &&
             (!filter.priceMin || doc.price >= filter.priceMin) &&
             (!filter.priceMax || doc.price <= filter.priceMax);
    });

    this.sortDoctors();
  }

  // ترتيب الدكاترة
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
      default: // Best Match
        // سيبيه زي ما هو أو تعملي logic حسب الحاجة
        break;
    }
  }

  // Helpers for slots
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