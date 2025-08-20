import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Tabeby';
  filter = {
    name: '',
    specialty: '',
    city: '',
    maxPrice: null,
    titleProfessor: false,
    titleLecturer: false,
    titleConsultant: false,
    titleSpecialist: false,
    genderFemale: false,
    genderMale: false,
    acceptPromo: false,
    fee: 'any'
  };
  doctors = [
    {
      name: 'Nurse Amal Fathy',
      title: 'Registered Nurse',
      rating: 4.2,
      ratingCount: 120,
      specialty: 'Nursing',
      specialtyDetails: 'Pediatric Nursing, Elderly Care',
      location: 'Cairo : Maadi',
      price: 120,
      waitingTime: '10 Minutes',
      callCost: '12001',
      gender: 'female',
      image: 'https://randomuser.me/api/portraits/women/60.jpg',
      slots: [
        { label: 'Today', times: [ { time: '8:00 AM', available: true }, { time: '9:30 AM', available: true } ] },
        { label: 'Tomorrow', times: [ { time: 'No Available Appointments', available: false } ] },
        { label: 'Wed 08/20', times: [ { time: '8:00 AM', available: true }, { time: '9:30 AM', available: true } ] }
      ],
      role: 'nurse',
      entity: 'hospital',
      acceptPromo: true
    },
    {
      name: 'Nurse Hany Said',
      title: 'Senior Nurse',
      rating: 4.0,
      ratingCount: 80,
      specialty: 'Nursing',
      specialtyDetails: 'Surgical Nursing, Emergency',
      location: 'Alexandria : Sporting',
      price: 100,
      waitingTime: '15 Minutes',
      callCost: '12002',
      gender: 'male',
      image: 'https://randomuser.me/api/portraits/men/61.jpg',
      slots: [
        { label: 'Today', times: [ { time: 'No Available Appointments', available: false } ] },
        { label: 'Tomorrow', times: [ { time: '10:00 AM', available: true }, { time: '11:00 AM', available: true } ] },
        { label: 'Wed 08/20', times: [ { time: '10:00 AM', available: true }, { time: '11:00 AM', available: true } ] }
      ],
      role: 'nurse',
      entity: 'clinic',
      acceptPromo: false
    },
    {
      name: 'Nurse Salma Younis',
      title: 'Nurse',
      rating: 4.7,
      ratingCount: 200,
      specialty: 'Nursing',
      specialtyDetails: 'Intensive Care, Home Nursing',
      location: 'Giza : Haram',
      price: 130,
      waitingTime: '12 Minutes',
      callCost: '12003',
      gender: 'female',
      image: 'https://randomuser.me/api/portraits/women/62.jpg',
      slots: [
        { label: 'Today', times: [ { time: 'No Available Appointments', available: false } ] },
        { label: 'Tomorrow', times: [ { time: 'No Available Appointments', available: false } ] },
        { label: 'Wed 08/20', times: [ { time: 'No Available Appointments', available: false } ] }
      ],
      role: 'nurse',
      entity: 'center',
      acceptPromo: true
    },
    // إضافة 27 طبيبة أنثى لاختبار الفلتر
    ...Array.from({length: 27}).map((_, i) => ({
      name: `Dr. Female ${i+1}`,
      title: i % 2 === 0 ? 'Professor of Pediatrics' : 'Lecturer of Dermatology',
      rating: 4 + (i % 2) * 0.5,
      ratingCount: 100 + i * 10,
      specialty: i % 3 === 0 ? 'Pediatrician' : (i % 3 === 1 ? 'Dermatologist' : 'Gynecologist'),
      specialtyDetails: i % 3 === 0 ? 'Child Health, Nutrition' : (i % 3 === 1 ? 'Skin, Laser' : 'Women Health, Infertility'),
      location: i % 2 === 0 ? 'Cairo : Heliopolis' : 'Alexandria : Miami',
      price: 200 + (i * 10),
      waitingTime: `${20 + i} Minutes`,
      callCost: `${15000 + i * 100}`,
      gender: 'female',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
      slots: [
        { label: 'Today', times: i % 4 === 0 ? [ { time: 'No Available Appointments', available: false } ] : [ { time: '2:00 PM', available: true }, { time: '3:30 PM', available: true } ] },
        { label: 'Tomorrow', times: i % 5 === 0 ? [ { time: 'No Available Appointments', available: false } ] : [ { time: '4:00 PM', available: true }, { time: '5:30 PM', available: true } ] },
        { label: 'Wed 08/20', times: i % 6 === 0 ? [ { time: 'No Available Appointments', available: false } ] : [ { time: '6:00 PM', available: true }, { time: '7:30 PM', available: true } ] }
      ]
    })),
    {
      name: 'Mariam Hassan',
      title: 'Lecturer of Obstetrics and Gynecology, Cairo University',
      rating: 4.5,
      ratingCount: 410,
      specialty: 'Gynecologist',
      specialtyDetails: 'Obstetrics, Infertility, Women Health',
      location: 'Cairo : Dokki',
      price: 320,
      waitingTime: '35 Minutes',
      callCost: '15500',
      gender: 'female',
  image: 'https://randomuser.me/api/portraits/women/44.jpg',
      slots: [
        { label: 'Today', times: [ { time: 'No Available Appointments', available: false } ] },
        { label: 'Tomorrow', times: [ { time: 'No Available Appointments', available: false } ] },
        { label: 'Wed 08/20', times: [ { time: 'No Available Appointments', available: false } ] }
      ]
    },
    {
      name: 'Mostafa Awny',
      title: 'Professor of Pediatrics & new born, Tanta university',
      rating: 4.5,
      ratingCount: 221,
      specialty: 'Pediatrician',
      specialtyDetails: 'Pediatrics, Pediatric Dietitian and Nutrition',
      location: 'Tanta : Elmoderia , El Set Mobarka (A) build',
      price: 300,
      waitingTime: '1 Hour and 10 Minutes',
      callCost: '16676',
  image: 'https://randomuser.me/api/portraits/men/45.jpg',
      slots: [
        { label: 'Today', times: [ { time: '2:00 PM', available: true }, { time: '3:30 PM', available: true } ] },
        { label: 'Tomorrow', times: [ { time: '2:00 PM', available: true }, { time: '3:30 PM', available: true } ] },
        { label: 'Wed 08/20', times: [ { time: '2:00 PM', available: true }, { time: '3:30 PM', available: true } ] }
      ]
    },
    {
      name: 'Sara Youssef',
      title: 'Consultant Cardiologist',
      rating: 5,
      ratingCount: 900,
      specialty: 'Cardiologist',
      specialtyDetails: 'Cardiology, Adult Cardiac Surgery',
      location: 'Cairo : Nasr City',
      price: 350,
      waitingTime: '45 Minutes',
      callCost: '15000',
  image: 'https://randomuser.me/api/portraits/women/65.jpg',
      slots: [
        { label: 'Today', times: [ { time: '10:00 AM', available: true }, { time: '11:30 AM', available: true } ] },
        { label: 'Tomorrow', times: [ { time: '10:00 AM', available: true }, { time: '11:30 AM', available: true } ] },
        { label: 'Wed 08/20', times: [ { time: '10:00 AM', available: true }, { time: '11:30 AM', available: true } ] }
      ]
    },
    {
      name: 'Ahmed Allam',
      title: 'Professor Of Orthopedics and Spinal surgery',
      rating: 4,
      ratingCount: 161,
      specialty: 'Orthopedist',
      specialtyDetails: 'Adult Orthopedic Surgery, Joint Replacement',
      location: 'Madinaty : Medical centre',
      price: 400,
      waitingTime: '30 Minutes',
      callCost: '16676',
  image: 'https://randomuser.me/api/portraits/men/12.jpg',
      slots: [
        { label: 'Today', times: [ { time: '9:00 PM', available: true }, { time: '9:30 PM', available: true } ] },
        { label: 'Tomorrow', times: [ { time: '8:30 PM', available: true }, { time: '9:00 PM', available: true } ] },
        { label: 'Wed 08/20', times: [ { time: '7:00 PM', available: true }, { time: '7:30 PM', available: true } ] }
      ]
    },
    {
      name: 'Mona Ali',
      title: 'Dentist',
      rating: 4,
      ratingCount: 500,
      specialty: 'Dentist',
      specialtyDetails: 'Cosmetic Dentistry, Pediatric Dentistry',
      location: 'Alexandria : Smouha',
      price: 250,
      waitingTime: '20 Minutes',
      callCost: '12000',
  image: 'https://randomuser.me/api/portraits/men/77.jpg',
      slots: [
        { label: 'Today', times: [ { time: '4:00 PM', available: true }, { time: '4:30 PM', available: true } ] },
        { label: 'Tomorrow', times: [ { time: '4:00 PM', available: true }, { time: '4:30 PM', available: true } ] },
        { label: 'Wed 08/20', times: [ { time: '4:00 PM', available: true }, { time: '4:30 PM', available: true } ] }
      ]
    },
    {
      name: 'Karim Samir',
      title: 'Dermatologist',
      rating: 3.5,
      ratingCount: 300,
      specialty: 'Dermatologist',
      specialtyDetails: 'Dermatology, Skin Surgery',
      location: 'Giza : Dokki',
      price: 200,
      waitingTime: '15 Minutes',
      callCost: '11000',
  image: 'https://randomuser.me/api/portraits/women/23.jpg',
      slots: [
        { label: 'Today', times: [ { time: '6:00 PM', available: true }, { time: '6:30 PM', available: true } ] },
        { label: 'Tomorrow', times: [ { time: '6:00 PM', available: true }, { time: '6:30 PM', available: true } ] },
        { label: 'Wed 08/20', times: [ { time: '6:00 PM', available: true }, { time: '6:30 PM', available: true } ] }
      ]
    },
    {
      name: 'Hossam Fathy',
      title: 'Orthopedic Surgeon',
      rating: 4,
      ratingCount: 700,
      specialty: 'Orthopedic',
      specialtyDetails: 'Orthopedics, Sports Injuries',
      location: 'Cairo : Maadi',
      price: 350,
      waitingTime: '18 Minutes',
      callCost: '14000',
  image: 'https://randomuser.me/api/portraits/men/81.jpg',
      slots: [
        { label: 'Today', times: [ { time: '8:00 PM', available: true }, { time: '8:30 PM', available: true } ] },
        { label: 'Tomorrow', times: [ { time: '8:00 PM', available: true }, { time: '8:30 PM', available: true } ] },
        { label: 'Wed 08/20', times: [ { time: '8:00 PM', available: true }, { time: '8:30 PM', available: true } ] }
      ]
    },
    {
      name: 'Nourhan Adel',
      title: 'Pediatrician',
      rating: 5,
      ratingCount: 800,
      specialty: 'Pediatrician',
      specialtyDetails: 'Pediatrics, Child Nutrition',
      location: 'Cairo : Heliopolis',
      price: 400,
      waitingTime: '12 Minutes',
      callCost: '13000',
  image: 'https://randomuser.me/api/portraits/women/19.jpg',
      slots: [
        { label: 'Today', times: [ { time: '10:00 AM', available: true }, { time: '10:30 AM', available: true } ] },
        { label: 'Tomorrow', times: [ { time: '10:00 AM', available: true }, { time: '10:30 AM', available: true } ] },
        { label: 'Wed 08/20', times: [ { time: '10:00 AM', available: true }, { time: '10:30 AM', available: true } ] }
      ]
    },
    {
      name: 'Yasser Magdy',
      title: 'ENT Specialist',
      rating: 4,
      ratingCount: 600,
      specialty: 'ENT',
      specialtyDetails: 'Ear, Nose and Throat',
      location: 'Cairo : Zamalek',
      price: 320,
      waitingTime: '22 Minutes',
      callCost: '12500',
  image: 'https://randomuser.me/api/portraits/men/53.jpg',
      slots: [
        { label: 'Today', times: [ { time: '1:00 PM', available: true }, { time: '1:30 PM', available: true } ] },
        { label: 'Tomorrow', times: [ { time: '1:00 PM', available: true }, { time: '1:30 PM', available: true } ] },
        { label: 'Wed 08/20', times: [ { time: '1:00 PM', available: true }, { time: '1:30 PM', available: true } ] }
      ]
    },
    {
      name: 'Rania Mostafa',
      title: 'Consultant Psychiatrist',
      rating: 5,
      ratingCount: 950,
      specialty: 'Psychiatrist',
      specialtyDetails: 'Psychiatry, Child Psychiatry',
      location: 'Alexandria : Miami',
      price: 280,
      waitingTime: '14 Minutes',
      callCost: '13500',
  image: 'https://randomuser.me/api/portraits/women/71.jpg',
      slots: [
        { label: 'Today', times: [ { time: '3:00 PM', available: true }, { time: '3:30 PM', available: true } ] },
        { label: 'Tomorrow', times: [ { time: '3:00 PM', available: true }, { time: '3:30 PM', available: true } ] },
        { label: 'Wed 08/20', times: [ { time: '3:00 PM', available: true }, { time: '3:30 PM', available: true } ] }
      ]
    },
    {
      name: 'Omar Khaled',
      title: 'Urologist',
      rating: 3,
      ratingCount: 400,
      specialty: 'Urologist',
      specialtyDetails: 'Urology, Andrology',
      location: 'Giza : Haram',
      price: 210,
      waitingTime: '16 Minutes',
      callCost: '11500',
  image: 'https://randomuser.me/api/portraits/women/50.jpg',
      slots: [
        { label: 'Today', times: [ { time: '5:00 PM', available: true }, { time: '5:30 PM', available: true } ] },
        { label: 'Tomorrow', times: [ { time: '5:00 PM', available: true }, { time: '5:30 PM', available: true } ] },
        { label: 'Wed 08/20', times: [ { time: '5:00 PM', available: true }, { time: '5:30 PM', available: true } ] }
      ]
    }
  ];
   isDarkMode = false;
  isRTL = false;
  isOpen = false;

  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  toggleLang(): void {
    this.isRTL = !this.isRTL;
    document.documentElement.dir = this.isRTL ? 'rtl' : 'ltr';
  }
}
