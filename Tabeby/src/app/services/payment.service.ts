import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InitiateResponse, StatusResponse } from '../models/payment.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private api = 'http://localhost:3000/api/payments';

  constructor(private http: HttpClient) {}

  private headers() {
    const token = localStorage.getItem('token') || '';
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }

  // يبدأ عملية الدفع ويرجع رابط الـ iframe
  initiatePaymob(bookingId: string) {
    return this.http.post<InitiateResponse>(
      `${this.api}/paymob`,
      { bookingId },
      this.headers()
    );
  }

 getBookingStatus(bookingId: string) {
  return this.http.get<StatusResponse>(
    `http://localhost:3000/api/bookings/${bookingId}/status`,
    this.headers()
  );
}

}
