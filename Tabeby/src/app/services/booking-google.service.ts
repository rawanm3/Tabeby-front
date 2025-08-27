import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingGoogleService {
private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token'); // 👈 لازم تكوني مخزنة التوكن بعد تسجيل الدخول
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

getFreeSlots(doctorId: string, date: string) {
  return this.http.get<any[]>(`${this.apiUrl}/bookings/free-slots?doctorId=${doctorId}&date=${date}`, {
    headers: this.getHeaders()
  });
}

createBooking(data: any) {
  return this.http.post(`${this.apiUrl}/bookings`, data, {
    headers: this.getHeaders()
  });
}

}
// , { doctorId, date }