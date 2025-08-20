import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TopRated {
  _id: string;
  avgRating: number;
  totalReviews: number;
  specialty: string;
  description: string;
  price: number;
  location: string;
  title: string;
  user: {
    fullName: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
private apiUrl = 'http://localhost:3000/reviews'; // ✅ غيّريها حسب الباك بتاعك

  constructor(private http: HttpClient) {}

  // 🟢 Get Top Doctors
  getTopDoctors(): Observable<TopRated[]> {
    return this.http.get<TopRated[]>(`${this.apiUrl}/top-doctors`);
  }

  // 🟢 Get Top Nurses
  getTopNurses(): Observable<TopRated[]> {
    return this.http.get<TopRated[]>(`${this.apiUrl}/top-nurses`);
  }
}
