import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/patients'; // 👈 API backend

  constructor(private http: HttpClient) {}

  // جلب كل المرضى
  getAllPatients(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // جلب بروفايل مريض واحد
  getPatientProfile(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // تحديث بيانات مريض
  updatePatientProfile(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data);
  }

  // تحديث التاريخ الطبي
  updateMedicalHistory(id: string, history: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/history/${id}`, { history });
  }
}
