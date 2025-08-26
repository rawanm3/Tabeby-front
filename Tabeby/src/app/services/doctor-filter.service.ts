import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Doctor {
  _id: string;
  specialty: string;
  location: string;
  price: number;
  userId: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DoctorFilterService {
private apiUrl = 'http://localhost:3000/doctors/'; // غيّري حسب الباك


  constructor(private http: HttpClient) {}

  
  // ✅ Get all doctors
  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ✅ Get doctor by id
  getDoctorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}

