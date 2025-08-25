import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:3000/doctors'; // 👈 API backend

  constructor(private http: HttpClient) {}

  // جلب كل الأطباء
  getAllDoctors(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // جلب بروفايل دكتور واحد
  getDoctorProfile(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // تحديث بروفايل دكتور
  updateDoctorProfile(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data);
  }
}
