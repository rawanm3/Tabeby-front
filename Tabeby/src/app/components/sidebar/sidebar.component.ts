import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Doctor, DoctorFilterService } from 'src/app/services/doctor-filter.service';
import { DoctorFilterPipe } from 'src/doctor-filter-pipe';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false
})
export class SidebarComponent {
  @Output() filterChange = new EventEmitter<any>();
  // doctors: Doctor[] = [];

  filter = {
    name: '',
    specialty: '',
    city: '',
    maxPrice: null
  };
  // constructor(private doctorFilterService: DoctorFilterService) {}

  // applyFilter() {
  //   this.doctorFilterService.getDoctors(this.filter).subscribe((res) => {
  //     this.doctors = res;
  //     console.log('Filtered Doctors:', this.doctors);
  //   });
  // }
// onFiltersChanged(filters: any) {
//   this.doctorFilterService.getDoctors(filters).subscribe((res) => {
//     this.doctors = res;
//   });
// }
//  onFilterChange() {
//     this.doctorFilterService.getDoctors(this.filter).subscribe({
//       next: (res) => this.doctors = res,
//       error: (err) => console.error(err)
//     });
//   }
}
