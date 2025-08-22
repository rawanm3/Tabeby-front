import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:3000/admin'; // ✨ adjust to your backend

  constructor(private http: HttpClient) {}

  getAllUsers(role?: string): Observable<User[]> {
    let url = this.apiUrl;
    if (role) url += `?role=${role}`;
    return this.http.get<User[]>(url);
  }

  getUserCountsByRole(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/counts`);
  }

  getPendingUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pending`);
  }

  updateVerificationStatus(userId: string, role: string, data: {status: string, rejectionReason?: string}): Observable<any> {
    return this.http.put(`${this.apiUrl}/verify/${role}/${userId}`, data);
  }

  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  toggleUserActivation(userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/toggle/${userId}`, {});
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
