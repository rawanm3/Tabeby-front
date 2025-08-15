import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.scss']
})
export class BookingSuccessComponent implements OnInit {
  booking: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.booking = history.state.booking;
    
    if (!this.booking) {
      this.router.navigate(['/doctors']);
    }
  }

  goHome() {
    this.router.navigate(['/doctors']);
  }
}