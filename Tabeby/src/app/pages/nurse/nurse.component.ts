import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  type: string;
}

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.scss']
})
export class NurseComponent {
  activeTab: 'nurse' | 'clinic' | 'appointments' | 'services' = 'nurse';
  appointmentFilter: 'upcoming' | 'previous' = 'upcoming';
  showAppointmentForm = false;
  newAppointment: Omit<Appointment, 'id' | 'type'> = {
    patientName: '',
    date: '',
    time: '',
    status: 'pending'
  };

  nurse = {
    name: 'منى أحمد',
    title: 'ممرضة قانونية أولى',
    photoUrl: 'https://via.placeholder.com/120x120.png?text=صورة',
    stars: 5,
    reviews: 68,
    experience: 8,
    specialty: 'تمريض الباطنة والجراحة',
    certificates: [
      'بكالوريوس التمريض - جامعة القاهرة',
      'دبلوم الرعاية المركزة - المعهد القومي للتمريض',
      'شهادة متقدمة في تمريض الطوارئ'
    ],
    bio: 'ممرضة متخصصة في الرعاية الحرجة والعناية المركزة. حاصلة على عدة شهادات في تمريض الباطنة والجراحة. لديها خبرة واسعة في رعاية المرضى قبل وبعد العمليات الجراحية.'
  };

  clinic = {
    info: 'العنوان: 15 شارع النصر، القاهرة - من الأحد إلى الخميس من 9:00 إلى 17:00، الهاتف: +20 123 456 789'
  };

  workingHours = [
    { day: 'الأحد', time: '9:00 ص - 5:00 م' },
    { day: 'الإثنين', time: '9:00 ص - 5:00 م' },
    { day: 'الثلاثاء', time: '9:00 ص - 5:00 م' },
    { day: 'الأربعاء', time: '9:00 ص - 5:00 م' },
    { day: 'الخميس', time: '9:00 ص - 5:00 م' },
    { day: 'الجمعة', time: 'إجازة' },
    { day: 'السبت', time: 'إجازة' }
  ];

  nursingServices = [
    {
      name: 'تمريض الباطنة',
      description: 'رعاية تمريضية متخصصة لمرضى الأمراض الباطنية والمزمنة',
      icon: 'fas fa-heartbeat'
    },
    {
      name: 'تمريض الجراحة',
      description: 'رعاية ما قبل وبعد العمليات الجراحية ومتابعة التعافي',
      icon: 'fas fa-procedures'
    },
    {
      name: 'الرعاية المنزلية',
      description: 'تقديم خدمات تمريضية متخصصة في منزل المريض',
      icon: 'fas fa-home'
    },
    {
      name: 'رعاية المسنين',
      description: 'رعاية تمريضية متخصصة لكبار السن ومرضى الشيخوخة',
      icon: 'fas fa-wheelchair'
    },
    {
      name: 'رعاية مرضى السكر',
      description: 'متابعة وتمريض متخصص لمرضى السكري وقياس السكر',
      icon: 'fas fa-syringe'
    },
    {
      name: 'الإسعافات الأولية',
      description: 'تقديم الإسعافات الأولية والرعاية الطارئة',
      icon: 'fas fa-first-aid'
    }
  ];

  appointments: Appointment[] = [
    {
      id: 1,
      patientName: 'أحمد محمد',
      date: '2024-01-15',
      time: '10:00 ص',
      status: 'confirmed',
      type: 'زيارة تمريضية'
    },
    {
      id: 2,
      patientName: 'فاطمة علي',
      date: '2024-01-16',
      time: '2:00 م',
      status: 'pending',
      type: 'متابعة علاج'
    },
    {
      id: 3,
      patientName: 'محمد حسن',
      date: '2024-01-14',
      time: '11:00 ص',
      status: 'completed',
      type: 'رعاية منزلية'
    },
    {
      id: 4,
      patientName: 'سارة أحمد',
      date: '2024-01-17',
      time: '9:00 ص',
      status: 'cancelled',
      type: 'حقن علاجية'
    }
  ];

  get filteredAppointments(): Appointment[] {
    const now = new Date();
    return this.appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      if (this.appointmentFilter === 'upcoming') {
        return appointmentDate >= now && appointment.status !== 'cancelled' && appointment.status !== 'completed';
      } else {
        return appointmentDate < now || appointment.status === 'cancelled' || appointment.status === 'completed';
      }
    });
  }

  getStatusText(status: Appointment['status']): string {
    const statusMap: Record<Appointment['status'], string> = {
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      completed: 'مكتمل',
      cancelled: 'ملغي'
    };
    return statusMap[status];
  }

  share() {
    if (navigator.share) {
      navigator.share({
        title: 'ممرضة منى أحمد',
        text: 'أفضل ممرضة متخصصة في الرعاية التمريضية',
        url: window.location.href
      });
    } else {
      alert('مشاركة غير متوفرة على هذا المتصفح');
    }
  }

  // ✅ فاليديشن على اسم المريض
  private validateAppointment(app: Omit<Appointment, 'id' | 'type'>): string | null {
    if (!app.patientName || app.patientName.length < 3) {
      return 'اسم المريض يجب أن يكون 3 أحرف على الأقل';
    }
    if (/\d/.test(app.patientName)) {
      return 'اسم المريض لا يجب أن يحتوي على أرقام';
    }
    if (!app.date || !app.time) {
      return 'يجب إدخال التاريخ والوقت';
    }
    return null;
  }

  submitAppointment() {
    const validationError = this.validateAppointment(this.newAppointment);
    if (validationError) {
      alert(validationError);
      return;
    }

    const newId = this.appointments.length > 0 ? Math.max(...this.appointments.map(a => a.id)) + 1 : 1;
    this.appointments.push({
      id: newId,
      patientName: this.newAppointment.patientName,
      date: this.newAppointment.date,
      time: this.newAppointment.time,
      status: this.newAppointment.status,
      type: 'زيارة تمريضية'
    });
    
    this.resetForm();
  }

  private resetForm() {
    this.newAppointment = { patientName: '', date: '', time: '', status: 'pending' };
    this.showAppointmentForm = false;
  }

  editAppointment(appointment: Appointment) {
    this.newAppointment = {
      patientName: appointment.patientName,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status
    };
    this.showAppointmentForm = true;
  }

  cancelAppointment(appointment: Appointment) {
    if (confirm(`هل تريد فعلاً إلغاء موعد ${appointment.patientName}؟`)) {
      const index = this.appointments.findIndex(a => a.id === appointment.id);
      if (index !== -1) {
        this.appointments[index].status = 'cancelled';
      }
    }
  }

  refreshAppointments() {
    console.log('تحديث المواعيد...');
    // محاكاة تحديث البيانات
    setTimeout(() => {
      this.appointments = [...this.appointments];
    }, 1000);
  }
}