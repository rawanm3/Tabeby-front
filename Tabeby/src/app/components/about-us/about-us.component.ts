import { Component } from '@angular/core';
import { DoctorFilterService } from 'src/app/services/doctor-filter.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  doctors: any[] = [];

  constructor(private doctorService: DoctorFilterService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        console.log('✅ All Doctors:', data);
      },
      error: (err) => {
        console.error('❌ Error fetching doctors:', err);
      }
    });
  }
}
