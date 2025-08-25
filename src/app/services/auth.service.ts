import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';

interface TokenPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;   // ✅ كانت number خلتها string
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
    const token = localStorage.getItem('token');
    if (token) {
      this.getCurrentUser().subscribe(); // هتظبط نفسها دلوقتي
    }
  }

  register(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, formData);
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        const decoded: TokenPayload = jwtDecode(response.token);

        const userData: User = {
          id: parseInt(response.user.id),
          name: response.user.name,
          email: response.user.email,
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
    this.router.navigate(['/login']);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  private authHeaders() {
    const token = this.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getCurrentUser(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    // ✅ بيضرب على /users/profile ومعاه التوكن
    return this.http.get<any>(`${this.baseUrl}/profile`, this.authHeaders()).pipe(
      tap((res) => {
        if (res?.user) {
          this.currentUserSubject.next({
            id: res.user._id || res.user.id,
            name: res.user.fullName || res.user.name,
            email: res.user.email,
            role: res.user.role,
          });
          localStorage.setItem('user', JSON.stringify(this.currentUserSubject.value));
        }
      }),
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
