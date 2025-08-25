import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  activeTab: 'info' | 'medical' | 'medications' | 'emergency' = 'info';
  patient: any = null;

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.loadPatientData();
  }

  loadPatientData() {
    const patientId = '66c08baf2f8c9f6e5f9a5678'; // 👈 يجي من الـ login
    this.patientService.getPatientProfile(patientId).subscribe({
      next: (data: any) => (this.patient = data),
      error: (err: any) => console.error('خطأ في تحميل بيانات المريض', err),
    });
  }
}
