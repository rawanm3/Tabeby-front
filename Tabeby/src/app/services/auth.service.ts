import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';

interface LoginResponse {
  token: string;
}

interface TokenPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Check for existing token on service initialization
    const token = localStorage.getItem('token');
    if (token) {
      this.getCurrentUser().subscribe();
    }
  }

  register(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, formData);
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          // خزّن التوكن
          localStorage.setItem('token', response.token);

          //  فك التوكن واستخرج البيانات
          const decoded: TokenPayload = jwtDecode(response.token);

          const userData = {
            name: decoded.name,
            email: decoded.email,
            role: response.user.role,
          };

          localStorage.setItem('user', JSON.stringify(userData));
          this.currentUserSubject.next(userData);
        }),
        catchError((err) => throwError(() => err))
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUser(): Observable<User> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    return this.http.get<User>(`${this.baseUrl}/getUser`).pipe(
      tap((user) => this.currentUserSubject.next(user)),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  verifyOtp(data: { email: string; otp: string }) {
    return this.http.post(`${this.baseUrl}/verify-otp`, data);
  }

  resendOtp(email: string) {
    return this.http.post(`${this.baseUrl}/resend-otp`, { email });
  }
  resetPassword(data: { email: string; newPassword: string }) {
    return this.http.post(`${this.baseUrl}/reset-password`, data);
  }

  forgotPassword(data: { email: string }) {
    return this.http.post(`${this.baseUrl}/forgot-password`, data);
  }
}
