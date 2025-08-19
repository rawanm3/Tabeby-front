import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-doctor-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  doctors = [
    {
      id: 1,
      name: 'أحمد محمد',
      specialty: 'أمراض القلب',
      rating: 4,
      location: 'مستشفى قنا العام',
      fees: 200,
      image: ''
    },
    {
      id: 2,
      name: 'سارة عبدالله',
      specialty: 'طب الأطفال',
      rating: 5,
      location: 'مستشفى القصر العيني',
      fees: 180,
      image: ''
    },
    {
      id: 3,
      name: 'خالد سعيد',
      specialty: 'الأعصاب',
      rating: 3,
      location: 'مستشفى العباسية للأمراض العقلية والعصبية',
      fees: 250,
      image: ''
    },
  ];
  constructor(private router: Router) {}


  selectDoctor(doctor: any) {
  this.router.navigate(['/choose-slot'], {
    state: { doctor } // Pass doctor data via state
  });
}
}