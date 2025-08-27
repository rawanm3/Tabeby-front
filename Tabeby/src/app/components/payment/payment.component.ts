import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { InitiateResponse, StatusResponse } from '../../models/payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  bookingId!: string;
  iframeUrl?: string;
  status?: string;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    // ناخد bookingId من ال Route (مثلاً /payment/:id)
    this.bookingId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.bookingId) {
      console.error('❌ BookingId not found in route');
    }
  }

  startPayment() {
    this.loading = true;
    this.paymentService.initiatePaymob(this.bookingId).subscribe({
      next: (res: InitiateResponse) => {
        this.iframeUrl = res.iframeUrl;
        this.loading = false;
        // بعد ما يفتح الدفع نبدأ نستعلم عن الحالة
        this.pollBookingStatus();
      },
      error: (err) => {
        console.error('❌ Error initiating payment:', err);
        this.loading = false;
      }
    });
  }

  pollBookingStatus() {
    const interval = setInterval(() => {
      this.paymentService.getBookingStatus(this.bookingId).subscribe({
        next: (res: StatusResponse) => {
          this.status = res.status;
          if (res.status === 'confirmed' || res.status === 'cancelled') {
            clearInterval(interval); // نوقف الاستعلام المستمر
          }
        },
        error: (err) => {
          console.error('❌ Error fetching booking status:', err);
          clearInterval(interval);
        }
      });
    }, 5000); // كل 5 ثواني
  }
}
