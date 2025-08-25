import { Component, OnInit } from '@angular/core';
import { SlotsService, Slot } from '../../services/slots.service';
import { DoctorService } from '../../services/doctor.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  activeTab: 'doctor' | 'clinic' | 'appointments' = 'doctor';
  appointmentFilter: 'upcoming' | 'previous' = 'upcoming';
  showAppointmentForm = false;
  showSuccessMessage = false;
  showAvailableSlots = false;
  availableSlots: Slot[] = [];
  selectedAppointment: any = null;

  newAppointment: any = {
    patientName: '',
    date: '',
    time: '',
    status: 'pending'
  };

  doctor: any = null;   // user
  clinic: any = null;   // profile (Doctor)
  appointments: any[] = [];
  workingHours: { day: string; time: string }[] = [];

  constructor(
    private slotsService: SlotsService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.loadDoctorData();
    this.loadAppointments();
  }

  private parseWorkingHours(workingHoursString: string) {
    // Assuming the format is "من الأحد إلى الخميس من 9:00 إلى 17:00"
    const daysAndTimes = workingHoursString.split('من').map(part => part.trim()).filter(part => part);
    this.workingHours = daysAndTimes.map((part) => {
      const [day, time] = part.split('إلى').map(p => p.trim());
      return { day, time };
    });
  }

  loadDoctorData() {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    if (user.role === 'doctor') {
      this.doctorService.getDoctorProfile(user.id).subscribe({
        next: (data: any) => {
          this.doctor = data;
          this.clinic = data;

          // Parse working hours from string to array format
          if (data.workingHours) {
            this.parseWorkingHours(data.workingHours);
          }
        },
        error: (err: any) => console.error('خطأ في تحميل بيانات الطبيب', err),
      });
    }
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data: any) => (this.appointments = data),
      error: (err: any) => console.error('خطأ في تحميل المواعيد', err),
    });
  }

  get filteredAppointments() {
    const now = new Date();
    return this.appointments.filter((apt: any) => {
      const aptDate = new Date(apt.date);
      if (this.appointmentFilter === 'upcoming') {
        return aptDate >= now && apt.status !== 'cancelled';
      } else {
        return aptDate < now || apt.status === 'cancelled';
      }
    });
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      confirmed: 'مؤكد',
      pending: 'قيد الانتظار',
      cancelled: 'ملغي',
    };
    return statusMap[status] || status;
  }

  refreshAppointments() {
    this.loadAppointments();
  }

  updateAvailableSlots() {
    this.slotsService.getAvailableSlots().subscribe((slots: Slot[]) => {
      this.availableSlots = slots;
      this.showAvailableSlots = true;
    });
  }

  submitAppointment() {
    if (this.selectedAppointment) {
      this.updateAppointment();
      return;
    }

    this.appointmentService.createAppointment(this.newAppointment).subscribe({
      next: () => {
        this.loadAppointments();
        this.showAppointmentForm = false;
        this.resetForm();
        this.success();
        this.updateAvailableSlots();
      },
      error: (err) => console.error('خطأ في إضافة الموعد', err),
    });
  }

  editAppointment(appointment: any) {
    this.selectedAppointment = { ...appointment };
    this.showAppointmentForm = true;
    this.newAppointment = {
      patientName: appointment.patientName,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
    };
  }

  updateAppointment() {
    if (this.selectedAppointment) {
      this.appointmentService
        .updateAppointment(this.selectedAppointment.id, this.newAppointment)
        .subscribe({
          next: () => {
            this.loadAppointments();
            this.showAppointmentForm = false;
            this.selectedAppointment = null;
            this.resetForm();
            this.success();
            this.updateAvailableSlots();
          },
          error: (err) => console.error('خطأ في تحديث الموعد', err),
        });
    }
  }

  cancelAppointment(appointment: any) {
    if (confirm(`هل تريد فعلاً إلغاء موعد ${appointment.patientName}؟`)) {
      this.appointmentService.cancelAppointment(appointment.id).subscribe({
        next: () => {
          this.loadAppointments();
          this.success();
          this.updateAvailableSlots();
        },
        error: (err) => console.error('خطأ في إلغاء الموعد', err),
      });
    }
  }

  bookSlot(slotId: string) {
    const slot = this.availableSlots.find((s: Slot) => s.id === slotId);
    if (slot) {
      this.newAppointment.date = slot.date;
      this.newAppointment.time = slot.time;
      this.showAppointmentForm = true;
      this.showAvailableSlots = false;
    }
  }

  private resetForm() {
    this.newAppointment = {
      patientName: '',
      date: '',
      time: '',
      status: 'pending',
    };
  }

  private success() {
    this.showSuccessMessage = true;
    setTimeout(() => (this.showSuccessMessage = false), 3000);
  }
}
