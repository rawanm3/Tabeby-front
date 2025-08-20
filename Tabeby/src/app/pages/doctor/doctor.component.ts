import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

interface Doctor {
  photoUrl: string;
  name: string;
  title: string;
  stars: number;
  reviews: number;
  mainSpecialty: string;
  bio: string;
}

interface Clinic {
  info: string;
}

interface Appointment {
  patientName: string;
  date: string;
  time: string;
  status: string;
}

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent {
  showAppointmentForm = false;
  appointmentForm!: FormGroup;

  // Missing properties from template
  doctor: Doctor = {
    photoUrl: 'assets/images/doctor-placeholder.jpg',
    name: 'دكتور أحمد محمد',
    title: 'استشاري أمراض الباطنة',
    stars: 4.5,
    reviews: 127,
    mainSpecialty: 'أمراض الباطنة والجهاز الهضمي',
    bio: 'دكتور أحمد محمد هو استشاري أمراض الباطنة والجهاز الهضمي مع خبرة تزيد عن 15 عاماً في مجال الطب. حاصل على زمالة الكلية الملكية للأطباء في لندن.'
  };

  clinic: Clinic = {
    info: 'عيادة متخصصة في أمراض الباطنة والجهاز الهضمي. مفتوحة من السبت إلى الخميس من 9 صباحاً حتى 5 مساءً.'
  };

  activeTab: string = 'doctor';
  workingHours = [
    { day: 'السبت', time: '9:00 ص - 5:00 م' },
    { day: 'الأحد', time: '9:00 ص - 5:00 م' },
    { day: 'الاثنين', time: '9:00 ص - 5:00 م' },
    { day: 'الثلاثاء', time: '9:00 ص - 5:00 م' },
    { day: 'الأربعاء', time: '9:00 ص - 5:00 م' },
    { day: 'الخميس', time: '9:00 ص - 5:00 م' }
  ];

  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  appointmentFilter: string = 'upcoming';
  newAppointment: Partial<Appointment> = {};
  showAvailableSlots: boolean = false;
  showSuccessMessage: boolean = false;
  availableSlots: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      patientName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)
        ]
      ],
      date: ['', [Validators.required, this.futureDateValidator]],
      time: ['', [Validators.required, this.futureTimeValidator.bind(this)]]
    });

    this.loadAppointments();
  }

  // Missing methods from template
  share() {
    if (navigator.share) {
      navigator.share({
        title: 'دكتور ' + this.doctor.name,
        text: 'احجز موعدك مع ' + this.doctor.name + ' - ' + this.doctor.title,
        url: window.location.href
      });
    } else {
      alert('مشاركة غير مدعومة في هذا المتصفح');
    }
  }

  refreshAppointments() {
    this.loadAppointments();
  }

  loadAppointments() {
    // Load appointments from service or API
    this.appointments = [
      {
        patientName: 'محمد أحمد',
        date: '2024-01-15',
        time: '10:00',
        status: 'confirmed'
      },
      {
        patientName: 'سارة محمد',
        date: '2024-01-16',
        time: '14:00',
        status: 'pending'
      }
    ];
    this.filterAppointments();
  }

  filterAppointments() {
    const today = new Date();
    if (this.appointmentFilter === 'upcoming') {
      this.filteredAppointments = this.appointments.filter(apt => new Date(apt.date) >= today);
    } else {
      this.filteredAppointments = this.appointments.filter(apt => new Date(apt.date) < today);
    }
  }

  editAppointment(appointment: Appointment) {
    this.newAppointment = { ...appointment };
    this.showAppointmentForm = true;
  }

  cancelAppointment(appointment: Appointment) {
    if (confirm('هل أنت متأكد من إلغاء هذا الموعد؟')) {
      this.appointments = this.appointments.filter(apt => apt !== appointment);
      this.filterAppointments();
    }
  }

  bookSlot(slotId: string) {
    console.log('Booking slot:', slotId);
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'confirmed': 'مؤكد',
      'pending': 'قيد الانتظار',
      'cancelled': 'ملغي',
      'completed': 'مكتمل'
    };
    return statusMap[status] || status;
  }

  // ✅ Validator: التاريخ ما يكونش في الماضي
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const today = new Date();
    const selectedDate = new Date(control.value);

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate < today ? { pastDate: true } : null;
  }

  // ✅ Validator: الوقت لو التاريخ هو النهاردة
  futureTimeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value || !this.appointmentForm) return null;

    const dateControl = this.appointmentForm.get('date');
    if (!dateControl?.value) return null;

    const selectedDate = new Date(dateControl.value);
    const today = new Date();

    if (
      selectedDate.getFullYear() !== today.getFullYear() ||
      selectedDate.getMonth() !== today.getMonth() ||
      selectedDate.getDate() !== today.getDate()
    ) {
      return null;
    }

    const [hours, minutes] = control.value.split(':').map((x: string) => +x);
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);

    return selectedTime <= today ? { pastTime: true } : null;
  }

  submitAppointment() {
    if (this.appointmentForm.valid) {
      const appointment = this.appointmentForm.value as Appointment;
      appointment.status = 'pending';
      this.appointments.push(appointment);
      this.filterAppointments();
      console.log('✅ Appointment Saved:', appointment);
      this.showAppointmentForm = false;
      this.appointmentForm.reset();
    } else {
      this.appointmentForm.markAllAsTouched();
    }
  }
}
