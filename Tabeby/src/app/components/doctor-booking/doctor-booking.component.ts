import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-booking',
  templateUrl: './doctor-booking.component.html',
  styleUrls: ['./doctor-booking.component.scss'],
})
export class DoctorBookingComponent implements OnInit {
  bookingForm!: FormGroup;

  doctor = {
    name: 'Dr. Ahmed Ali',
    specialty: 'Cardiologist',
    price: 500,
    address: '123 Health Street, Cairo',
    experience: 10,
    patients: 1200,
    description:
      'Dr. Ahmed Ali is a highly experienced cardiologist specializing in heart health and preventive care. He is known for his patient-centered approach and thorough consultations.',
  };

  steps = [
    { number: 1, text: 'Choose Date', status: 'active' },
    { number: 2, text: 'Select Time', status: 'pending' },
    { number: 3, text: 'Personal Info', status: 'pending' },
    { number: 4, text: 'Confirm', status: 'pending'},
  ];

  availableDays: string[] = [];
  firstDays: string[] = [];
  remainingDays: string[] = [];
  showRemainingDays: boolean = false;

  availableTimes: string[] = [];
  firstTimes: string[] = [];
  remainingTimes: string[] = [];
  showRemainingTimes: boolean = false;

  selectedDay: string | null = null;
  selectedTime: string | null = null;

  reviews = [
    { author: 'Ahmed Ali', text: 'Excellent doctor, very professional!', rating: 5 },
    { author: 'Sara Mohamed', text: 'Good experience, friendly staff.', rating: 4 },
    { author: 'Omar Khaled', text: 'Average consultation.', rating: 3 },
  ];

  averageRating: number = 0;
  showFullDescription = false;
  loading = false;

  constructor(private fb: FormBuilder, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{8,15}$')]],
      email: ['', [Validators.email]],
      notes: [''],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      residence: ['', Validators.required],
    });

    // توليد الأيام
    this.availableDays = this.generateAvailableDays(21);
    this.firstDays = this.availableDays.slice(0, 7);
    this.remainingDays = this.availableDays.slice(7);

    // توليد أوقات اليوم كل نصف ساعة
    this.availableTimes = this.generateTimeSlots('12:00 PM', '11:30 PM', 30);
    this.firstTimes = this.availableTimes.slice(0, 5);
    this.remainingTimes = this.availableTimes.slice(5);

    // حساب متوسط الريتينج
    if (this.reviews.length > 0) {
      const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      this.averageRating = +(total / this.reviews.length).toFixed(1);
    }
  }

  generateAvailableDays(count: number): string[] {
    const days: string[] = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      days.push(this.formatDate(nextDay));
    }
    return days;
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  generateTimeSlots(startTime: string, endTime: string, intervalMinutes: number): string[] {
    const times: string[] = [];
    let [startHour, startMinutes, startPeriod] = this.parseTime(startTime);
    let [endHour, endMinutes, endPeriod] = this.parseTime(endTime);

    const to24Hour = (hour: number, period: string) =>
      period === 'PM' && hour < 12 ? hour + 12 : hour === 12 && period === 'PM' ? 0 : hour;

    let current = new Date();
    current.setHours(to24Hour(startHour, startPeriod), startMinutes, 0, 0);

    const endDate = new Date();
    endDate.setHours(to24Hour(endHour, endPeriod), endMinutes, 0, 0);

    while (current <= endDate) {
      const hours = current.getHours();
      const minutes = current.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHour = hours % 12 === 0 ? 12 : hours % 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      times.push(`${displayHour}:${displayMinutes} ${period}`);
      current.setMinutes(current.getMinutes() + intervalMinutes);
    }

    return times;
  }

  parseTime(timeStr: string): [number, number, string] {
    const [time, period] = timeStr.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    return [hour, minute, period];
  }

  toggleRemainingDays() {
    this.showRemainingDays = !this.showRemainingDays;
  }

  toggleRemainingTimes() {
    this.showRemainingTimes = !this.showRemainingTimes;
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  get f() {
    return this.bookingForm.controls;
  }

  selectDay(day: string) {
    this.selectedDay = day;
    this.updateSteps(2);
  }

  selectTime(time: string) {
    this.selectedTime = time;
    this.updateSteps(3);
  }

  getDayMonth(day: string): string {
    const parts = day.split(' ');
    return parts[1].replace(',', '') + ' ' + parts[0];
  }

  confirmBooking() {
  // منع الضغط أثناء التحميل
  if (this.loading) return;

  if (this.bookingForm.invalid || !this.selectedDay || !this.selectedTime) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Form',
      text: 'Please complete all fields and select date & time.',
    });
    return;
  }

  this.loading = true; // بدء التحميل
  this.updateSteps(4);

  const bookingData = {
    doctor: this.doctor.name,
    specialty: this.doctor.specialty,
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
        text: '✅ Your booking is confirmed! You will receive a confirmation SMS.',
        timer: 3000,
        showConfirmButton: false,
      });
    },
    error: () => {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: '❌ Failed to confirm booking. Please try again.',
      });
    },
  });
}


  updateSteps(activeStep: number) {
    this.steps = this.steps.map((step) => {
      if (step.number < activeStep) return { ...step, status: 'completed' };
      else if (step.number === activeStep) return { ...step, status: 'active' };
      else return { ...step, status: 'upcoming' };
    });
  }

  getRoundedRating(): number {
    return Math.round(this.averageRating);
  }
}
