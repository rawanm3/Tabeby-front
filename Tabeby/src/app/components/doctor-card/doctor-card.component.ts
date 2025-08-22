import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent {
  @Input() doctor: any;

  book(doctor: any, day: any) {
    alert('Booking for ' + doctor.name + ' on ' + day.label + ' from ' + (day.times[0]?.time || 'N/A'));
  }
}