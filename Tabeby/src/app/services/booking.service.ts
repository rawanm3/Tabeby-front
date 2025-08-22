// src/app/services/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:3000'; // رابط السيرفر

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // افترضنا أنك خزنت التوكن بعد تسجيل الدخول
    return token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};
  }

  // POST للحجز
  createBooking(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, data, this.getAuthHeaders());
  }

  // GET كل الأطباء
  getDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors`);
  }

  // GET الأيام المتاحة
  getAvailableDays(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookings/available-days`);
  }

  // GET الأوقات المتاحة ليوم معين
  getAvailableTimes(day: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookings/available-times?day=${day}`);
  }

  // GET مراجعات الدكتور
  getDoctorReviews(doctorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/doctor/${doctorId}`, this.getAuthHeaders());
  }
}
