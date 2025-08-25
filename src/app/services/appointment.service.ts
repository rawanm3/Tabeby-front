import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: string;
  doctorId?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/appointments';
  private appointments: Appointment[] = [];

  constructor(private http: HttpClient) {
    // Initialize with sample data
    this.initializeAppointments();
  }

  private initializeAppointments() {
    this.appointments = [
      {
        id: '1',
        patientName: 'أحمد محمد',
        date: '2024-01-15',
        time: '10:00',
        status: 'confirmed',
        doctorId: '1',
        type: 'استشارة طبية'
      },
      {
        id: '2',
        patientName: 'فاطمة علي',
        date: '2024-01-16',
        time: '14:00',
        status: 'pending',
        doctorId: '1',
        type: 'متابعة علاج'
      },
      {
        id: '3',
        patientName: 'محمد حسن',
        date: '2024-01-14',
        time: '11:00',
        status: 'completed',
        doctorId: '1',
        type: 'كشف دوري'
      },
      {
        id: '4',
        patientName: 'سارة أحمد',
        date: '2024-01-17',
        time: '09:00',
        status: 'cancelled',
        doctorId: '1',
        type: 'استشارة طبية'
      }
    ];
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};
  }

  getAppointments(): Observable<Appointment[]> {
    // For now, return local data. Replace with HTTP call when backend is ready
    return of(this.appointments);
    
    // Uncomment when backend is ready:
    // return this.http.get<Appointment[]>(this.apiUrl, this.getAuthHeaders());
  }

  createAppointment(appointment: Omit<Appointment, 'id'>): Observable<Appointment> {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString()
    };
    this.appointments.push(newAppointment);
    return of(newAppointment);
    
    // Uncomment when backend is ready:
    // return this.http.post<Appointment>(this.apiUrl, appointment, this.getAuthHeaders());
  }

  updateAppointment(id: string, appointment: Partial<Appointment>): Observable<Appointment> {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.appointments[index] = { ...this.appointments[index], ...appointment };
      return of(this.appointments[index]);
    }
    return of(null as any);
    
    // Uncomment when backend is ready:
    // return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment, this.getAuthHeaders());
  }

  cancelAppointment(id: string): Observable<any> {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.appointments[index].status = 'cancelled';
      return of({ success: true });
    }
    return of({ success: false });
    
    // Uncomment when backend is ready:
    // return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  getAppointmentsByDoctor(doctorId: string): Observable<Appointment[]> {
    return of(this.appointments.filter(a => a.doctorId === doctorId));
    
    // Uncomment when backend is ready:
    // return this.http.get<Appointment[]>(`${this.apiUrl}?doctorId=${doctorId}`, this.getAuthHeaders());
  }

  getAppointmentsByStatus(status: string): Observable<Appointment[]> {
    return of(this.appointments.filter(a => a.status === status));
    
    // Uncomment when backend is ready:
    // return this.http.get<Appointment[]>(`${this.apiUrl}?status=${status}`, this.getAuthHeaders());
  }
}
