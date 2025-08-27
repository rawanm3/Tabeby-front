import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { BookingService } from 'src/app/services/booking.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-doctor-booking',
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.scss'],
})
export class DoctorBookingComponent implements OnInit {
  bookingForm!: FormGroup;
  reviewForm!: FormGroup;

  doctor: any = null;
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

  userId: string | null = null; // ✅ userId من التوكن

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

  // ✅ فك التوكن للحصول على userId
  const token = localStorage.getItem('token');
  if (token) {
    const decoded: any = jwtDecode(token);
    this.userId = decoded.id; 
  }

  const doctorId = this.route.snapshot.paramMap.get('id');
  if (doctorId) {
    this.fetchDoctorData(doctorId);
    this.loadReviews(doctorId);

    // 🔹 إنشاء الأيام من اليوم لحد 21 يوم قدام
    const today = new Date();
    for (let i = 0; i < 21; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      this.availableDays.push(this.formatDay(d));
    }
    this.firstDays = this.availableDays.slice(0, 7);
    this.remainingDays = this.availableDays.slice(7);
  }
}


  formatDay(date: Date): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const dayName = days[date.getDay()];
    return `${dayName} ${d}/${m}`;
  }

  selectDay(day: string) {
    this.selectedDay = day;
    this.updateSteps(2);

    const times: string[] = [];
    for (let h = 12; h < 24; h++) {
      times.push(`${h}:00 - ${h}:30`);
      times.push(`${h}:30 - ${h + 1}:00`);
    }

    this.availableTimes = times;
    this.firstTimes = times.slice(0, 5);
    this.remainingTimes = times.slice(5);
  }

  // fetchDoctorData(doctorId: string) {
  //   this.bookingService.getDoctorById(doctorId).subscribe({
  //     next: (res) => {
  //       this.doctor = res;
  //       if (!this.doctor) {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Doctor Not Found',
  //           text: 'الدكتور غير موجود',
  //         });
  //       }
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'فشل في جلب بيانات الدكتور',
  //       });
  //     },
  //   });
  // }
fetchDoctorData(doctorId: string) {
this.route.paramMap.subscribe(params => {
  const doctorId = params.get('id');
  if (doctorId) {
    this.bookingService.getDoctorById(doctorId).subscribe({
      next: (doc) => this.doctor = doc,
      error: (err) => console.error('❌ API Error:', err)
    });
  }
});

}


  loadReviews(doctorId: string) {
    this.bookingService.getDoctorReviews(doctorId).subscribe({
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

    if (!this.doctor) {
      Swal.fire({
        icon: 'error',
        title: 'Doctor Not Found',
        text: 'الدكتور غير موجود',
      });
      return;
    }

    if (this.bookingForm.invalid || !this.selectedDay || !this.selectedTime) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please complete all fields and select date & time.',
      });
      return;
    }

    if (!this.userId) {
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'Please login to book an appointment.',
      });
      return;
    }

    this.loading = true;
    this.updateSteps(4);

    const bookingData = {
      userId: this.userId,
      doctorId: this.doctor._id,
      specialty: this.doctor.specialty,
      date: this.selectedDay,
      time: this.selectedTime,
      patient: {
        name: this.bookingForm.value.name,
        phone: this.bookingForm.value.phone,
        email: this.bookingForm.value.email,
        age: this.bookingForm.value.age,
        residence: this.bookingForm.value.residence,
        notes: this.bookingForm.value.notes,
      },
    };

    console.log('Booking Data:', bookingData); // ✅ للتأكد من البيانات قبل الإرسال

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
      error: (err) => {
        console.error(err);
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
    if (this.reviewForm.invalid || !this.doctor?._id) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Review',
        text: 'Please provide a rating and comment before submitting.',
      });
      return;
    }

    const reviewData = {
      rating: this.reviewForm.value.rating,
      text: this.reviewForm.value.comment,
      author: this.bookingForm.value.name || 'Anonymous',
    };

    this.bookingService.addDoctorReview(this.doctor._id, reviewData).subscribe({
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

  getRoundedRating(): number {
    return Math.round(this.averageRating);
  }
}
