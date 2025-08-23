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
private apiUrl = 'http://localhost:3000/doctors'; // غيّري حسب الباك
// doctor-filter.service.ts
getSpecialties(): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/specialties`);
}


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


}

