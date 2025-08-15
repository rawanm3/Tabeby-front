import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss']
})
export class ConfirmBookingComponent implements OnInit {
  booking: any = {};
  patientForm!: FormGroup; // <-- إضافة علامة ! للتأكيد على أن القيمة ستكون معينة

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.booking = {
      doctor: history.state.doctor,
      slot: history.state.slot
    };
    
    if (!this.booking.doctor || !this.booking.slot) {
      this.router.navigate(['/doctors']);
      return;
    }

    this.initForm();
  }

  initForm(): void { // <-- تحديد نوع الإرجاع
    this.patientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.pattern(/^05\d{8}$/)]],
      id: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  submitBooking(): void {
    if (this.patientForm.invalid) return;
    
    const bookingData = {
      ...this.booking,
      patient: this.patientForm.value,
      bookingDate: new Date(),
      bookingRef: this.generateBookingRef()
    };
    
    console.log('Booking submitted:', bookingData);
    
    this.router.navigate(['/booking-success'], {
      state: { booking: bookingData }
    });
  }

  generateBookingRef(): string {
    return 'REF-' + Math.floor(100000 + Math.random() * 900000);
  }

  goBack(): void {
    this.router.navigate(['/choose-slot'], {
      state: { doctor: this.booking.doctor }
    });
  }
}