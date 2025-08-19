import { Component } from '@angular/core';

interface Doctor {
  name: string;
  specialty: string;
  city: string;
  price: number;
}

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.html',
  styleUrls: ['./doctor-list.scss']
})
export class DoctorListComponent {
  doctors: Doctor[] = [
    { name: 'Dr. Ahmed Hassan', specialty: 'Cardiologist', city: 'Cairo', price: 200 },
    { name: 'Dr. Mona Ali', specialty: 'Dentist', city: 'Alexandria', price: 150 },
    { name: 'Dr. Karim Samir', specialty: 'Dermatologist', city: 'Giza', price: 250 }
  ];

  searchName: string = '';
  selectedSpecialty: string = '';
  selectedCity: string = '';
  maxPrice: number | null = null;
}

