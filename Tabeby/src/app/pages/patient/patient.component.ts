import { Component } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  activeTab: 'info' | 'medical' | 'medications' | 'emergency' = 'info';

  patient = {
    name: 'محمد أحمد',
    fullName: 'محمد أحمد إبراهيم',
    age: 42,
    gender: 'ذكر',
    bloodType: 'O+',
    phone: '+20 123 456 789',
    email: 'mohamed.ahmed@example.com',
    address: '15 شارع النصر، القاهرة',
    photoUrl: 'https://via.placeholder.com/120x120.png?text=صورة',
    
    emergencyContact: {
      name: 'أحمد محمد',
      relation: 'أخ',
      phone: '+20 987 654 321'
    },
    
    medicalConditions: [
      'ضغط الدم المرتفع',
      'السكري النوع الثاني'
    ],
    
    allergies: [
      'البنسلين',
      'غبار الطلع'
    ],
    
    surgicalHistory: [
      'استئصال الزائدة الدودية (2015)',
      'جراحة الركبة (2018)'
    ],
    
    currentMedications: [
      {
        name: 'ميتفورمين',
        dosage: '500 مجم',
        frequency: 'مرتين يومياً',
        purpose: 'علاج السكري'
      },
      {
        name: 'أملوديبين',
        dosage: '5 مجم',
        frequency: 'مرة يومياً',
        purpose: 'علاج ضغط الدم'
      }
    ],
    
    medicationHistory: [
      {
        name: 'أتورفاستاتين',
        startDate: '01/01/2020',
        endDate: '01/06/2021'
      }
    ],
    
    specialInstructions: 'يجب إبلاغ الطبيب عن أي أعراض جديدة. الالتزام بالحمية الغذائية وتجنب الأطعمة الغنية بالصوديوم والسكريات.'
  };


  }
