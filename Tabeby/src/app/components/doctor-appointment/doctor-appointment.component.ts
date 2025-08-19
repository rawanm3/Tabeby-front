import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {
  doctors: Doctor[] = [];
  selectedSorting: string = 'Best Match';
  sortingOptions = ['Best Match', 'Top Rated', 'Lowest Price', 'Highest Price'];
  selectedSlot: { doctorIndex: number, slotIndex: number, timeIndex: number } | null = null;
  filteredDoctors: Doctor[] = [];
  currentFilter: any = {};
  
  constructor(private router: Router) { }
  
  onFilterChange(filter: any): void {
    this.currentFilter = filter;
    // The sortedDoctors getter will automatically apply the filters
  }

  ngOnInit(): void {
    // Mock data for doctors and nurses
    this.doctors = [
      {
        name: 'Medhat kamhawy',
        title: 'Professor',
        specialty: 'Urology',
        specialtyDetails: 'male disease and infertility',
        image: 'assets/images/doctors/doctor1.jpg',
        rating: 4,
        ratingCount: 81,
        location: 'El-Zagazig : Elgalaa st from moled naby street infront of omar afandy',
        price: 270,
        waitingTime: 12,
        callCost: '16676',
        gender: 'male',
        entity: 'hospital',
        acceptPromo: true,
        slots: [
          {
            label: 'Thu 08/21',
            times: [
              { time: '2:00 PM', available: true },
              { time: '2:20 PM', available: true },
              { time: '2:40 PM', available: true },
              { time: '3:00 PM', available: true },
              { time: '3:20 PM', available: true },
              { time: '3:40 PM', available: true }
            ]
          },
          {
            label: 'Fri 08/22',
            times: [
              { time: '2:00 PM', available: false }
            ]
          },
          {
            label: 'Sat 08/23',
            times: [
              { time: '2:00 PM', available: true },
              { time: '2:20 PM', available: true },
              { time: '2:40 PM', available: true },
              { time: '3:00 PM', available: true },
              { time: '3:20 PM', available: true },
              { time: '3:40 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Sara Ahmed',
        title: 'Consultant',
        specialty: 'Dermatology',
        specialtyDetails: 'skin and cosmetic procedures',
        image: 'assets/images/doctors/doctor2.jpg',
        rating: 5,
        ratingCount: 120,
        location: 'Alexandria',
        price: 350,
        waitingTime: 10,
        callCost: '16678',
        gender: 'female',
        entity: 'center',
        acceptPromo: true,
        slots: [
          {
            label: 'Today',
            times: [
              { time: '4:00 PM', available: true },
              { time: '4:30 PM', available: true },
              { time: '5:00 PM', available: true }
            ]
          },
          {
            label: 'Tomorrow',
            times: [
              { time: '4:00 PM', available: true },
              { time: '4:30 PM', available: true },
              { time: '5:00 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Ahmed Hassan',
        title: 'Lecturer',
        specialty: 'Cardiology',
        specialtyDetails: 'heart diseases',
        image: 'assets/images/doctors/doctor3.jpg',
        rating: 4.2,
        ratingCount: 65,
        location: 'Giza',
        price: 200,
        waitingTime: 20,
        callCost: '16679',
        gender: 'male',
        entity: 'hospital',
        acceptPromo: false,
        slots: [
          {
            label: 'Wed 08/20',
            times: [
              { time: '6:00 PM', available: true },
              { time: '6:30 PM', available: true },
              { time: '7:00 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Nadia Mahmoud',
        title: 'Specialist',
        specialty: 'Pediatrics',
        specialtyDetails: 'children healthcare',
        image: 'assets/images/doctors/doctor4.jpg',
        rating: 4.7,
        ratingCount: 92,
        location: 'Cairo',
        price: 180,
        waitingTime: 15,
        callCost: '16680',
        gender: 'female',
        entity: 'clinic',
        acceptPromo: true,
        slots: [
          {
            label: 'Today',
            times: [
              { time: '3:00 PM', available: true },
              { time: '3:30 PM', available: true },
              { time: '4:00 PM', available: true }
            ]
          },
          {
            label: 'Tomorrow',
            times: [
              { time: '3:00 PM', available: true },
              { time: '3:30 PM', available: true },
              { time: '4:00 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Basem Fouad',
        title: 'Professor',
        specialty: 'ENT',
        specialtyDetails: 'ear, nose and throat at the Faculty of Medicine',
        image: 'assets/images/doctors/doctor5.jpg',
        rating: 4.5,
        ratingCount: 78,
        location: 'Cairo',
        price: 300,
        waitingTime: 15,
        callCost: '16677',
        gender: 'male',
        entity: 'clinic',
        acceptPromo: false,
        slots: [
          {
            label: 'Today',
            times: [
              { time: '5:00 PM', available: true },
              { time: '5:30 PM', available: true },
              { time: '6:00 PM', available: true },
              { time: '6:30 PM', available: true }
            ]
          },
          {
            label: 'Tomorrow',
            times: [
              { time: '5:00 PM', available: true },
              { time: '5:30 PM', available: true },
              { time: '6:00 PM', available: true },
              { time: '6:30 PM', available: true }
            ]
          },
          {
            label: 'Wed 08/20',
            times: [
              { time: '5:00 PM', available: true },
              { time: '5:30 PM', available: true },
              { time: '6:00 PM', available: true },
              { time: '6:30 PM', available: true }
            ]
          }
        ]
      },
      // Additional doctors and nurses for testing filters
      {
        name: 'Laila Kamal',
        title: 'Specialist',
        specialty: 'Gynecology',
        specialtyDetails: 'women health',
        image: 'assets/images/doctors/doctor6.jpg',
        rating: 4.3,
        ratingCount: 75,
        location: 'Cairo',
        price: 220,
        waitingTime: 25,
        callCost: '16681',
        gender: 'female',
        entity: 'clinic',
        role: 'doctor',
        acceptPromo: true,
        slots: [
          {
            label: 'Today',
            times: [
              { time: '4:00 PM', available: true },
              { time: '4:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Khaled Mahmoud',
        title: 'Professor',
        specialty: 'Orthopedics',
        specialtyDetails: 'bone and joint surgery',
        image: 'assets/images/doctors/doctor7.jpg',
        rating: 4.8,
        ratingCount: 110,
        location: 'Alexandria',
        price: 320,
        waitingTime: 30,
        callCost: '16682',
        gender: 'male',
        entity: 'hospital',
        role: 'doctor',
        acceptPromo: false,
        slots: [
          {
            label: 'Tomorrow',
            times: [
              { time: '5:00 PM', available: true },
              { time: '5:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Amina Saleh',
        title: 'Nurse',
        specialty: 'General Care',
        specialtyDetails: 'patient care and assistance',
        image: 'assets/images/doctors/doctor8.jpg',
        rating: 4.2,
        ratingCount: 45,
        location: 'Giza',
        price: 80,
        waitingTime: 10,
        callCost: '16683',
        gender: 'female',
        entity: 'hospital',
        role: 'nurse',
        acceptPromo: true,
        slots: [
          {
            label: 'Today',
            times: [
              { time: '2:00 PM', available: true },
              { time: '2:30 PM', available: true },
              { time: '3:00 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Tarek Zaki',
        title: 'Consultant',
        specialty: 'Neurology',
        specialtyDetails: 'brain and nervous system',
        image: 'assets/images/doctors/doctor9.jpg',
        rating: 4.6,
        ratingCount: 88,
        location: 'Cairo',
        price: 280,
        waitingTime: 20,
        callCost: '16684',
        gender: 'male',
        entity: 'center',
        role: 'doctor',
        acceptPromo: false,
        slots: [
          {
            label: 'Wed 08/20',
            times: [
              { time: '4:00 PM', available: true },
              { time: '4:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Hoda Farouk',
        title: 'Lecturer',
        specialty: 'Ophthalmology',
        specialtyDetails: 'eye care and surgery',
        image: 'assets/images/doctors/doctor10.jpg',
        rating: 4.4,
        ratingCount: 72,
        location: 'Alexandria',
        price: 240,
        waitingTime: 15,
        callCost: '16685',
        gender: 'female',
        entity: 'clinic',
        role: 'doctor',
        acceptPromo: true,
        slots: [
          {
            label: 'Tomorrow',
            times: [
              { time: '3:00 PM', available: true },
              { time: '3:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Mostafa Hamdy',
        title: 'Nurse',
        specialty: 'Intensive Care',
        specialtyDetails: 'critical care nursing',
        image: 'assets/images/doctors/doctor11.jpg',
        rating: 4.1,
        ratingCount: 40,
        location: 'Cairo',
        price: 90,
        waitingTime: 5,
        callCost: '16686',
        gender: 'male',
        entity: 'hospital',
        role: 'nurse',
        acceptPromo: true,
        slots: [
          {
            label: 'Today',
            times: [
              { time: '1:00 PM', available: true },
              { time: '1:30 PM', available: true },
              { time: '2:00 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Rania Adel',
        title: 'Professor',
        specialty: 'Endocrinology',
        specialtyDetails: 'hormonal disorders',
        image: 'assets/images/doctors/doctor12.jpg',
        rating: 4.7,
        ratingCount: 95,
        location: 'Giza',
        price: 310,
        waitingTime: 25,
        callCost: '16687',
        gender: 'female',
        entity: 'center',
        role: 'doctor',
        acceptPromo: false,
        slots: [
          {
            label: 'Wed 08/20',
            times: [
              { time: '5:00 PM', available: true },
              { time: '5:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Yasser Fawzy',
        title: 'Specialist',
        specialty: 'Psychiatry',
        specialtyDetails: 'mental health',
        image: 'assets/images/doctors/doctor13.jpg',
        rating: 4.3,
        ratingCount: 68,
        location: 'Cairo',
        price: 230,
        waitingTime: 20,
        callCost: '16688',
        gender: 'male',
        entity: 'clinic',
        role: 'doctor',
        acceptPromo: true,
        slots: [
          {
            label: 'Tomorrow',
            times: [
              { time: '4:00 PM', available: true },
              { time: '4:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Dina Samir',
        title: 'Nurse',
        specialty: 'Pediatric Care',
        specialtyDetails: 'children nursing',
        image: 'assets/images/doctors/doctor14.jpg',
        rating: 4.0,
        ratingCount: 35,
        location: 'Alexandria',
        price: 75,
        waitingTime: 10,
        callCost: '16689',
        gender: 'female',
        entity: 'hospital',
        role: 'nurse',
        acceptPromo: true,
        slots: [
          {
            label: 'Today',
            times: [
              { time: '3:00 PM', available: true },
              { time: '3:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Hany Shawky',
        title: 'Consultant',
        specialty: 'Gastroenterology',
        specialtyDetails: 'digestive system',
        image: 'assets/images/doctors/doctor15.jpg',
        rating: 4.5,
        ratingCount: 82,
        location: 'Cairo',
        price: 290,
        waitingTime: 30,
        callCost: '16690',
        gender: 'male',
        entity: 'hospital',
        role: 'doctor',
        acceptPromo: false,
        slots: [
          {
            label: 'Wed 08/20',
            times: [
              { time: '6:00 PM', available: true },
              { time: '6:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Fatma Nabil',
        title: 'Lecturer',
        specialty: 'Dermatology',
        specialtyDetails: 'skin diseases and cosmetics',
        image: 'assets/images/doctors/doctor16.jpg',
        rating: 4.4,
        ratingCount: 70,
        location: 'Giza',
        price: 250,
        waitingTime: 20,
        callCost: '16691',
        gender: 'female',
        entity: 'clinic',
        role: 'doctor',
        acceptPromo: true,
        slots: [
          {
            label: 'Today',
            times: [
              { time: '5:00 PM', available: true },
              { time: '5:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Karim Essam',
        title: 'Nurse',
        specialty: 'Emergency Care',
        specialtyDetails: 'emergency nursing',
        image: 'assets/images/doctors/doctor17.jpg',
        rating: 4.0,
        ratingCount: 38,
        location: 'Cairo',
        price: 85,
        waitingTime: 5,
        callCost: '16692',
        gender: 'male',
        entity: 'hospital',
        role: 'nurse',
        acceptPromo: true,
        slots: [
          {
            label: 'Tomorrow',
            times: [
              { time: '2:00 PM', available: true },
              { time: '2:30 PM', available: true },
              { time: '3:00 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Mona Samy',
        title: 'Professor',
        specialty: 'Oncology',
        specialtyDetails: 'cancer treatment',
        image: 'assets/images/doctors/doctor18.jpg',
        rating: 4.9,
        ratingCount: 115,
        location: 'Cairo',
        price: 350,
        waitingTime: 35,
        callCost: '16693',
        gender: 'female',
        entity: 'hospital',
        role: 'doctor',
        acceptPromo: false,
        slots: [
          {
            label: 'Wed 08/20',
            times: [
              { time: '3:00 PM', available: true },
              { time: '3:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Adel Fahmy',
        title: 'Specialist',
        specialty: 'Pulmonology',
        specialtyDetails: 'respiratory system',
        image: 'assets/images/doctors/doctor19.jpg',
        rating: 4.2,
        ratingCount: 65,
        location: 'Alexandria',
        price: 210,
        waitingTime: 15,
        callCost: '16694',
        gender: 'male',
        entity: 'clinic',
        role: 'doctor',
        acceptPromo: true,
        slots: [
          {
            label: 'Today',
            times: [
              { time: '6:00 PM', available: true },
              { time: '6:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Heba Magdy',
        title: 'Nurse',
        specialty: 'Geriatric Care',
        specialtyDetails: 'elderly care',
        image: 'assets/images/doctors/doctor20.jpg',
        rating: 4.1,
        ratingCount: 42,
        location: 'Giza',
        price: 70,
        waitingTime: 10,
        callCost: '16695',
        gender: 'female',
        entity: 'center',
        role: 'nurse',
        acceptPromo: true,
        slots: [
          {
            label: 'Tomorrow',
            times: [
              { time: '1:00 PM', available: true },
              { time: '1:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Tamer Hosny',
        title: 'Consultant',
        specialty: 'Cardiology',
        specialtyDetails: 'heart diseases and surgery',
        image: 'assets/images/doctors/doctor21.jpg',
        rating: 4.7,
        ratingCount: 98,
        location: 'Cairo',
        price: 300,
        waitingTime: 25,
        callCost: '16696',
        gender: 'male',
        entity: 'hospital',
        role: 'doctor',
        acceptPromo: false,
        slots: [
          {
            label: 'Wed 08/20',
            times: [
              { time: '5:00 PM', available: true },
              { time: '5:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Noha Fathy',
        title: 'Lecturer',
        specialty: 'Rheumatology',
        specialtyDetails: 'joint and autoimmune diseases',
        image: 'assets/images/doctors/doctor22.jpg',
        rating: 4.3,
        ratingCount: 75,
        location: 'Alexandria',
        price: 230,
        waitingTime: 20,
        callCost: '16697',
        gender: 'female',
        entity: 'clinic',
        role: 'doctor',
        acceptPromo: true,
        slots: [
          {
            label: 'Today',
            times: [
              { time: '4:00 PM', available: true },
              { time: '4:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Ayman Salah',
        title: 'Nurse',
        specialty: 'Surgical Care',
        specialtyDetails: 'surgical nursing',
        image: 'assets/images/doctors/doctor23.jpg',
        rating: 3.9,
        ratingCount: 30,
        location: 'Cairo',
        price: 80,
        waitingTime: 5,
        callCost: '16698',
        gender: 'male',
        entity: 'hospital',
        role: 'nurse',
        acceptPromo: true,
        slots: [
          {
            label: 'Tomorrow',
            times: [
              { time: '3:00 PM', available: true },
              { time: '3:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Marwa Hamed',
        title: 'Professor',
        specialty: 'Nephrology',
        specialtyDetails: 'kidney diseases',
        image: 'assets/images/doctors/doctor24.jpg',
        rating: 4.8,
        ratingCount: 105,
        location: 'Giza',
        price: 330,
        waitingTime: 30,
        callCost: '16699',
        gender: 'female',
        entity: 'center',
        role: 'doctor',
        acceptPromo: false,
        slots: [
          {
            label: 'Wed 08/20',
            times: [
              { time: '4:00 PM', available: true },
              { time: '4:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Sherif Nour',
        title: 'Specialist',
        specialty: 'Hematology',
        specialtyDetails: 'blood disorders',
        image: 'assets/images/doctors/doctor25.jpg',
        rating: 4.4,
        ratingCount: 72,
        location: 'Cairo',
        price: 240,
        waitingTime: 20,
        callCost: '16700',
        gender: 'male',
        entity: 'clinic',
        role: 'doctor',
        acceptPromo: true,
        slots: [
          {
            label: 'Today',
            times: [
              { time: '5:00 PM', available: true },
              { time: '5:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Eman Rashed',
        title: 'Nurse',
        specialty: 'Maternity Care',
        specialtyDetails: 'maternal and newborn care',
        image: 'assets/images/doctors/doctor26.jpg',
        rating: 4.2,
        ratingCount: 45,
        location: 'Alexandria',
        price: 75,
        waitingTime: 10,
        callCost: '16701',
        gender: 'female',
        entity: 'hospital',
        role: 'nurse',
        acceptPromo: true,
        slots: [
          {
            label: 'Tomorrow',
            times: [
              { time: '2:00 PM', available: true },
              { time: '2:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Mahmoud Gamal',
        title: 'Consultant',
        specialty: 'Urology',
        specialtyDetails: 'urinary tract and male reproductive system',
        image: 'assets/images/doctors/doctor27.jpg',
        rating: 4.6,
        ratingCount: 88,
        location: 'Cairo',
        price: 280,
        waitingTime: 25,
        callCost: '16702',
        gender: 'male',
        entity: 'hospital',
        role: 'doctor',
        acceptPromo: false,
        slots: [
          {
            label: 'Wed 08/20',
            times: [
              { time: '6:00 PM', available: true },
              { time: '6:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Salma Fouad',
        title: 'Lecturer',
        specialty: 'Allergy and Immunology',
        specialtyDetails: 'allergies and immune system disorders',
        image: 'assets/images/doctors/doctor28.jpg',
        rating: 4.3,
        ratingCount: 68,
        location: 'Giza',
        price: 220,
        waitingTime: 15,
        callCost: '16703',
        gender: 'female',
        entity: 'clinic',
        role: 'doctor',
        acceptPromo: true,
        slots: [
          {
            label: 'Today',
            times: [
              { time: '3:00 PM', available: true },
              { time: '3:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Hassan Ali',
        title: 'Nurse',
        specialty: 'Psychiatric Care',
        specialtyDetails: 'mental health nursing',
        image: 'assets/images/doctors/doctor29.jpg',
        rating: 4.0,
        ratingCount: 35,
        location: 'Cairo',
        price: 85,
        waitingTime: 10,
        callCost: '16704',
        gender: 'male',
        entity: 'center',
        role: 'nurse',
        acceptPromo: true,
        slots: [
          {
            label: 'Tomorrow',
            times: [
              { time: '4:00 PM', available: true },
              { time: '4:30 PM', available: true }
            ]
          }
        ]
      },
      {
        name: 'Yasmin Kamel',
        title: 'Professor',
        specialty: 'Obstetrics and Gynecology',
        specialtyDetails: 'women health and pregnancy',
        image: 'assets/images/doctors/doctor30.jpg',
        rating: 4.9,
        ratingCount: 120,
        location: 'Cairo',
        price: 340,
        waitingTime: 30,
        callCost: '16705',
        gender: 'female',
        entity: 'hospital',
        role: 'doctor',
        acceptPromo: false,
        slots: [
          {
            label: 'Wed 08/20',
            times: [
              { time: '5:00 PM', available: true },
              { time: '5:30 PM', available: true }
            ]
          }
        ]
      }
    ];
  }

  get sortedDoctors(): Doctor[] {
    // First apply filters
    const filtered = this.applyFilters(this.doctors);
    
    // Then apply sorting
    if (this.selectedSorting === 'Top Rated') {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (this.selectedSorting === 'Lowest Price') {
      return [...filtered].sort((a, b) => a.price - b.price);
    } else if (this.selectedSorting === 'Highest Price') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered; // Best Match (default)
  }
  
  applyFilters(doctors: Doctor[]): Doctor[] {
    if (!this.currentFilter || Object.keys(this.currentFilter).length === 0) {
      return doctors;
    }
    
    return doctors.filter(doctor => {
      let passesFilter = true;
      
      // Filter by title
      if (this.currentFilter.titleProfessor || this.currentFilter.titleLecturer || 
          this.currentFilter.titleConsultant || this.currentFilter.titleSpecialist) {
        // If any title filter is selected
        const titleMatch = (this.currentFilter.titleProfessor && doctor.title === 'Professor') ||
                          (this.currentFilter.titleLecturer && doctor.title === 'Lecturer') ||
                          (this.currentFilter.titleConsultant && doctor.title === 'Consultant') ||
                          (this.currentFilter.titleSpecialist && doctor.title === 'Specialist');
        if (!titleMatch) passesFilter = false;
      }
      
      // Filter by gender
      if (passesFilter && (this.currentFilter.genderMale || this.currentFilter.genderFemale)) {
        // If any gender filter is selected
        const genderMatch = (this.currentFilter.genderMale && doctor.gender?.toLowerCase() === 'male') ||
                           (this.currentFilter.genderFemale && doctor.gender?.toLowerCase() === 'female');
        if (!genderMatch) passesFilter = false;
      }
      
      // Filter by availability
      if (passesFilter && this.currentFilter.availability !== 'any') {
        if (this.currentFilter.availability === 'today') {
          const hasTodaySlot = doctor.slots.some(slot => slot.label === 'Today' && 
            slot.times.some(time => time.available));
          if (!hasTodaySlot) passesFilter = false;
        } else if (this.currentFilter.availability === 'tomorrow') {
          const hasTomorrowSlot = doctor.slots.some(slot => slot.label === 'Tomorrow' && 
            slot.times.some(time => time.available));
          if (!hasTomorrowSlot) passesFilter = false;
        } else if (this.currentFilter.availability === 'wed') {
          const hasWedSlot = doctor.slots.some(slot => slot.label === 'Wed 08/20' && 
            slot.times.some(time => time.available));
          if (!hasWedSlot) passesFilter = false;
        }
      }
      
      // Filter by promo code acceptance
      if (passesFilter && this.currentFilter.acceptPromo && !doctor.acceptPromo) {
        passesFilter = false;
      }
      
      // Filter by fee
      if (passesFilter && this.currentFilter.fee !== 'any') {
        if (this.currentFilter.fee === 'lt50' && doctor.price >= 50) {
          passesFilter = false;
        } else if (this.currentFilter.fee === '50-100' && (doctor.price < 50 || doctor.price > 100)) {
          passesFilter = false;
        } else if (this.currentFilter.fee === '100-200' && (doctor.price < 100 || doctor.price > 200)) {
          passesFilter = false;
        } else if (this.currentFilter.fee === '200-300' && (doctor.price < 200 || doctor.price > 300)) {
          passesFilter = false;
        } else if (this.currentFilter.fee === 'gt300' && doctor.price <= 300) {
          passesFilter = false;
        }
      }
      
      // Filter by entity
      if (passesFilter && this.currentFilter.entity && doctor.entity !== this.currentFilter.entity) {
        passesFilter = false;
      }
      
      // Filter by role
      if (passesFilter && this.currentFilter.role !== 'any' && doctor.role !== this.currentFilter.role) {
        passesFilter = false;
      }
      
      return passesFilter;
    });
  }

  changeSorting(sortType: string): void {
    this.selectedSorting = sortType;
  }

  hasAvailableSlots(times: any[]): boolean {
    return times && times.some(time => time.available);
  }

  getAvailableSlotCount(times: any[]): number {
    return times ? times.filter(time => time.available).length : 0;
  }

  bookAppointment(doctor: Doctor, slot: any): void {
    // In a real app, this would navigate to a booking page or open a modal
    if (this.hasAvailableSlots(slot.times)) {
      alert(`Booking appointment with ${doctor.name} on ${slot.label}`);
      // this.router.navigate(['/booking'], { state: { doctor, slot } });
    }
  }
}
