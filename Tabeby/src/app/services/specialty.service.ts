import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
 private apiUrl = 'http://localhost:3000/api/specialties';

  constructor(private http: HttpClient) {}

  getDoctorSpecialties(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/doctors`);
  }

  getNurseSpecialties(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/nurses`);
  }
}
