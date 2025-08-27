import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:3000';
    private baseUrl = 'http://localhost:3000/doctors';


  constructor(private http: HttpClient) {}

  /** إضافة التوكن في الهيدر */
private getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token
    ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
    : {};
}

  //=========== Doctors ===========//

  /** إنشاء حجز جديد لدكتور */
  createBooking(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, data, this.getAuthHeaders());
  }

  /** جلب كل الأطباء */
  getDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors`);
  }

  /** جلب بيانات دكتور محدد */
  // getDoctorById(id: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/doctors/${id}`);
  // }
getDoctorById(id: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/${id}`);
}

  /** جلب الأيام المتاحة */
  getAvailableDays(doctorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookings/available-days/${doctorId}`);
  }

  /** جلب المواعيد المتاحة */
  getAvailableTimes(doctorId: string, day: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookings/available-times/${doctorId}/${day}`);
  }

  /** جلب المراجعات الخاصة بدكتور */
  getDoctorReviews(doctorId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/reviews/doctor/${doctorId}`,
      this.getAuthHeaders()
    );
  }

  /** إضافة مراجعة جديدة لدكتور */
  addDoctorReview(doctorId: string, reviewData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/reviews/doctor/${doctorId}`,
      reviewData,
      this.getAuthHeaders()
    );
  }

  //=========== Nurses ===========//

  /** إنشاء حجز جديد لممرضة */
  createBookingForNurse(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/nurse-bookings`, data, this.getAuthHeaders());
  }

  /** جلب كل الممرضات */
  getNurses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/nurses`);
  }

  /** جلب بيانات ممرضة محددة */
  getNurseById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/nurses/${id}`);
  }

  /** جلب الأيام المتاحة لممرضة */
  getAvailableDaysForNurse(nurseId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/nurse-bookings/available-days/${nurseId}`);
  }

  /** جلب المواعيد المتاحة لممرضة */
  getAvailableTimesForNurse(nurseId: string, day: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/nurse-bookings/available-times/${nurseId}/${day}`);
  }

  /** جلب المراجعات الخاصة بممرضة */
  getNurseReviews(nurseId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/reviews/nurse/${nurseId}`,
      this.getAuthHeaders()
    );
  }
addNurseReview(nurseId: string, reviewData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/reviews/nurse/${nurseId}`,
      reviewData,
      this.getAuthHeaders()
    );
  }
}
