import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  // private apiBase = 'http://localhost:3000/api/auth/google'; // غيريها حسب الباك إند
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // // طلب الربط (redirect)
  // getConnectUrl(token: string): string {
  //   return `${this.apiBase}?token=${encodeURIComponent(token)}`;
  // }

  // // فصل الحساب
  // disconnect(): Observable<any> {
  //   return this.http.post(`${this.apiBase}/disconnect`, {});
  // }
  
  // تسجيل جديد باستخدام Google
  signUpWithGoogle() {
    window.location.href = `${this.apiUrl}/google/signup`;
  }

  // ربط Google مع حساب موجود
  connectGoogle() {
    window.location.href = `${this.apiUrl}/google/connect`;
  }

  // فصل Google
  disconnectGoogle(): Observable<any> {
    return this.http.post(`${this.apiUrl}/disconnect`, {});
  }
}
