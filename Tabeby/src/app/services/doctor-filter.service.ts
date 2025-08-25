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
// doctor-filter.service.ts
// getSpecialties(): Observable<string[]> {
//   return this.http.get<string[]>(`${this.apiUrl}/specialties`);
// }


  constructor(private http: HttpClient) {}

  // getDoctors(filter: any = {}): Observable<Doctor[]> {
  //   let params = new HttpParams();

  //   if (filter.name) {
  //     params = params.set('name', filter.name);
  //   }
  //   if (filter.specialty) {
  //     params = params.set('specialty', filter.specialty);
  //   }
  //   if (filter.city) {
  //     params = params.set('city', filter.city);
  //   }
  //   if (filter.maxPrice) {
  //     params = params.set('maxPrice', filter.maxPrice);
  //   }

  //   return this.http.get<Doctor[]>(this.apiUrl, { params });
  // }

  // فلترة الدكاترة
  // getFilteredDoctors(filters: any): Observable<any> {
  //   let params = new HttpParams();

  //   if (filters.gender) {
  //     params = params.set('gender', filters.gender);
  //   }
  //   if (filters.title) {
  //     params = params.set('title', filters.title);
  //   }
  //   if (filters.specialty) {
  //     params = params.set('specialty', filters.specialty);
  //   }
  //   if (filters.minPrice) {
  //     params = params.set('minPrice', filters.minPrice);
  //   }
  //   if (filters.maxPrice) {
  //     params = params.set('maxPrice', filters.maxPrice);
  //   }

  //   return this.http.get<any>(this.apiUrl, { params });
  // }
  // private apiUrl = 'http://localhost:3000/api/doctors'; // غير الرابط حسب الباك

  // constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

