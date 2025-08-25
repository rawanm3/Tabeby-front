import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-nurse-booking',
  templateUrl: './nurse-booking.component.html',
  styleUrls: ['./nurse-booking.component.scss'],
})
export class NurseBookingComponent implements OnInit {
  bookingForm!: FormGroup;
  reviewForm!: FormGroup;
  
  nurse: any = null;
  steps = [
    { number: 1, text: 'Choose Date', status: 'active' },
    { number: 2, text: 'Select Time', status: 'pending' },
    { number: 3, text: 'Personal Info', status: 'pending' },
    { number: 4, text: 'Confirm', status: 'pending' },
  ];

  availableDays: string[] = [];
  firstDays: string[] = [];
  remainingDays: string[] = [];
  showRemainingDays = false;

  availableTimes: string[] = [];
  firstTimes: string[] = [];
  remainingTimes: string[] = [];
  showRemainingTimes = false;

  selectedDay: string | null = null;
  selectedTime: string | null = null;

  reviews: any[] = [];
  averageRating: number = 0;
  showFullDescription = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{8,15}$')]],
      email: ['', [Validators.email]],
      notes: [''],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      residence: ['', Validators.required],
    });

    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });

    const nurseId = this.route.snapshot.paramMap.get('id');
    if (nurseId) {
      this.fetchNurseData(nurseId);
      this.loadReviews(nurseId);

      this.bookingService.getAvailableDays(nurseId).subscribe({
        next: (days) => {
          this.availableDays = days;
          this.firstDays = days.slice(0, 7);
          this.remainingDays = days.slice(7);
        }
      });
    }
  }

  selectDay(day: string) {
    this.selectedDay = day;
    this.updateSteps(2);

    if (!this.nurse?._id) return;

    this.bookingService.getAvailableTimes(this.nurse._id, day).subscribe({
      next: (times) => {
        this.availableTimes = times;
        this.firstTimes = times.slice(0, 5);
        this.remainingTimes = times.slice(5);
      }
    });
  }

  fetchNurseData(nurseId: string) {
    this.bookingService.getNurseById(nurseId).subscribe({
      next: (res) => { this.nurse = res; },
      error: (err) => console.error(err),
    });
  }

  getDayMonth(day: string): string {
    const parts = day.split(' ');
    return parts[1].replace(',', '') + ' ' + parts[0];
  }

  loadReviews(nurseId: string) {
    this.bookingService.getNurseReviews(nurseId).subscribe({
      next: (res: any[]) => {
        this.reviews = res;
        if (this.reviews.length > 0) {
          const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
          this.averageRating = +(total / this.reviews.length).toFixed(1);
        }
      },
      error: (err) => console.error(err),
    });
  }

  toggleRemainingDays() { this.showRemainingDays = !this.showRemainingDays; }
  toggleRemainingTimes() { this.showRemainingTimes = !this.showRemainingTimes; }
  toggleDescription() { this.showFullDescription = !this.showFullDescription; }
  get f() { return this.bookingForm.controls; }

  selectTime(time: string) {
    this.selectedTime = time;
    this.updateSteps(3);
  }

  confirmBooking() {
    if (this.loading) return;

    if (this.bookingForm.invalid || !this.selectedDay || !this.selectedTime) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please complete all fields and select date & time.',
      });
      return;
    }

    this.loading = true;
    this.updateSteps(4);

    const bookingData = {
      nurse: this.nurse.name,
      specialty: this.nurse.specialty,
      date: this.selectedDay,
      time: this.selectedTime,
      patient: this.bookingForm.value,
    };

    this.bookingService.createBooking(bookingData).subscribe({
      next: () => {
        this.bookingForm.reset();
        this.selectedDay = null;
        this.selectedTime = null;
        this.updateSteps(1);
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: 'Booking Confirmed!',
          text: 'Your booking is confirmed! You will receive a confirmation SMS.',
          timer: 3000,
          showConfirmButton: false,
        });
      },
      error: () => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: 'Failed to confirm booking. Please try again.',
        });
      },
    });
  }

  updateSteps(activeStep: number) {
    if (activeStep === 2 && !this.selectedDay) return;
    if (activeStep === 3 && !this.selectedTime) return;
    if (activeStep === 4 && (this.bookingForm.invalid || !this.selectedDay || !this.selectedTime)) return;

    this.steps = this.steps.map(step => {
      if (step.number < activeStep) return { ...step, status: 'completed' };
      else if (step.number === activeStep) return { ...step, status: 'active' };
      else return { ...step, status: 'upcoming' };
    });
  }

  submitReview() {
    if (this.reviewForm.invalid || !this.nurse?._id) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Review',
        text: 'Please provide a rating and comment before submitting.',
      });
      return;
    }

    const reviewData = this.reviewForm.value;

    this.bookingService.addNurseReview(this.nurse._id, reviewData).subscribe({
      next: (newReview) => {
        this.reviews.unshift(newReview);
        this.reviewForm.reset();
        this.updateAverageRating();

        Swal.fire({
          icon: 'success',
          title: 'Thank You!',
          text: 'Your review has been submitted successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Could not submit your review. Please try again later.',
        });
      },
    });
  }

  private updateAverageRating() {
    if (this.reviews.length > 0) {
      const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      this.averageRating = +(total / this.reviews.length).toFixed(1);
    }
  }

  getRoundedRating(): number { return Math.round(this.averageRating); }
}
