import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlotsService, Slot } from '../../services/slots.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent {
  activeTab: 'doctor' | 'clinic' | 'appointments' = 'doctor';
  appointmentFilter: 'upcoming' | 'previous' = 'upcoming';
  showAppointmentForm = false;
  showSuccessMessage = false;
  showAvailableSlots = false;
  availableSlots: Slot[] = [];
  selectedAppointment: any = null;

  // ✅ Pattern للتحقق من الاسم: لازم يبدأ بحرف كابيتال أو عربي
  namePattern = /^[A-Zأ-ي][a-zA-Zأ-ي\s]*$/;

  newAppointment: any = {
    patientName: '',
    date: '',
    time: '',
    status: 'pending'
  };

  doctor = {
    name: 'سامي طارق',
    title: 'إستشاري طب الأسنان',
    photoUrl: 'https://via.placeholder.com/120x120.png?text=صورة',
    stars: 5,
    reviews: 74,
    mainSpecialty: 'طب أسنان البالغين',
    bio: 'طبيب أسنان خريج جامعة عين شمس. عضو الكلية الملكية للجراحين في أيرلندا. مقيم في قسم جراحة الوجه والفكين، جامعة عين شمس.'
  };

  clinic = {
    info: 'العنوان: 23 شارع أكتوبر، القاهرة - من الأحد إلى الخميس من 10:00 إلى 18:00، الهاتف: +20 123 456 789'
  };

  workingHours = [
    { day: 'الأحد', time: '10:00 ص - 6:00 م' },
    { day: 'الإثنين', time: '10:00 ص - 6:00 م' },
    { day: 'الثلاثاء', time: '10:00 ص - 6:00 م' },
    { day: 'الأربعاء', time: '10:00 ص - 6:00 م' },
    { day: 'الخميس', time: '10:00 ص - 6:00 م' },
    { day: 'الجمعة', time: 'إجازة' },
    { day: 'السبت', time: 'إجازة' }
  ];

  appointments = [
    { id: 1, patientName: 'أحمد محمد', date: '2023-10-15', time: '10:00 ص', status: 'confirmed' },
    { id: 2, patientName: 'فاطمة إبراهيم', date: '2023-10-16', time: '11:30 ص', status: 'confirmed' },
    { id: 3, patientName: 'محمود السيد', date: '2023-10-17', time: '2:00 م', status: 'pending' },
    { id: 4, patientName: 'سارة كمال', date: '2023-09-20', time: '10:00 ص', status: 'confirmed' },
    { id: 5, patientName: 'علي حسن', date: '2023-09-15', time: '12:00 م', status: 'cancelled' }
  ];

  constructor(private slotsService: SlotsService) {}

  get filteredAppointments() {
    const now = new Date();
    return this.appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      if (this.appointmentFilter === 'upcoming') {
        return aptDate >= now && apt.status !== 'cancelled';
      } else {
        return aptDate < now || apt.status === 'cancelled';
      }
    });
  }

  getStatusText(status: string): string {
    const statusMap: {[key: string]: string} = {
      'confirmed': 'مؤكد',
      'pending': 'قيد الانتظار',
      'cancelled': 'ملغي'
    };
    return statusMap[status] || status;
  }

  share() {
    if (navigator.share) {
      navigator.share({
        title: `د. ${this.doctor.name}`,
        text: 'اطلع على صفحة الطبيب',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط الصفحة!');
    }
  }

  refreshAppointments() {
    console.log('جاري تحديث قائمة المواعيد...');
    setTimeout(() => {
      this.appointments = [...this.appointments].sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.time);
        const dateB = new Date(b.date + ' ' + b.time);
        return dateB.getTime() - dateA.getTime();
      });
      console.log('تم تحديث المواعيد بنجاح');
    }, 1000);
  }

  updateAvailableSlots() {
    this.slotsService.getAvailableSlots().subscribe(slots => {
      this.availableSlots = slots;
      this.showAvailableSlots = true;
    });
  }

  submitAppointment() {
    if (this.selectedAppointment) {
      this.updateAppointment();
      return;
    }
    const newId = Math.max(...this.appointments.map(a => a.id), 0) + 1;
    this.appointments.push({
      id: newId,
      ...this.newAppointment
    });

    this.showAppointmentForm = false;
    this.newAppointment = { patientName: '', date: '', time: '', status: 'pending' };

    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);

    this.updateAvailableSlots();
  }

  editAppointment(appointment: any) {
    this.selectedAppointment = { ...appointment };
    this.showAppointmentForm = true;
    this.newAppointment = {
      patientName: appointment.patientName,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status
    };
  }

  updateAppointment() {
    if (this.selectedAppointment) {
      const index = this.appointments.findIndex(a => a.id === this.selectedAppointment.id);
      if (index !== -1) {
        this.appointments[index] = {
          ...this.selectedAppointment,
          ...this.newAppointment
        };
      }

      this.showAppointmentForm = false;
      this.selectedAppointment = null;
      this.newAppointment = { patientName: '', date: '', time: '', status: 'pending' };

      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);

      this.updateAvailableSlots();
    }
  }

  cancelAppointment(appointment: any) {
    if (confirm(`هل تريد فعلاً إلغاء موعد ${appointment.patientName}؟`)) {
      appointment.status = 'cancelled';
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.updateAvailableSlots();
    }
  }

  bookSlot(slotId: string) {
    const slot = this.availableSlots.find(s => s.id === slotId);
    if (slot) {
      this.newAppointment.date = slot.date;
      this.newAppointment.time = slot.time;
      this.showAppointmentForm = true;
      this.showAvailableSlots = false;
    }
  }
}
