import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingGoogleService } from 'src/app/services/booking-google.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent {
bookingForm: FormGroup;
  freeSlots: any[] = [];

  doctors = [
    { id: '68aea7588009270c40e020d8', name: 'د. Rawan Mohamed' }
  ];

  patients = [
    { id: '68aea61f8009270c40e020b4', name: 'مريض تجريبي' }
  ];

  constructor(
    private fb: FormBuilder,
    private bookingGoogleService: BookingGoogleService,

  ) {
    this.bookingForm = this.fb.group({
      doctorId: ['', Validators.required],
      patientId: ['', Validators.required],
      date: ['', Validators.required],
      slot: ['', Validators.required]
    });
  }

  loadFreeSlots() {
    const { doctorId, date } = this.bookingForm.value;
    if (doctorId && date) {
      this.bookingGoogleService.getFreeSlots(doctorId, date).subscribe({
        next: (res) => (this.freeSlots = res),
        error: (err) => console.error(err)
      });
    }
  }
submit() {
  if (this.bookingForm.valid) {
    const slot = this.freeSlots.find(s => s.start === this.bookingForm.value.slot);

    const data = {
      doctorId: this.bookingForm.value.doctorId,
      patientId: this.bookingForm.value.patientId,
      startTime: slot?.start,
      endTime: slot?.end,
      description: "حجز عبر النظام",
      type: "clinic"
    };

    console.log("🚀 [ANGULAR] Booking Payload:", JSON.stringify(data, null, 2));

    this.bookingGoogleService.createBooking(data).subscribe({
      next: (res) => console.log("✅ [ANGULAR] Booking Success:", res),
      error: (err) => console.error("❌ [ANGULAR] Booking Error:", err)
    });
  }
}




}
