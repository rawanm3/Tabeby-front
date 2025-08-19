import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../../models/doctor.model';

interface TimeSlot {
  time: string;
  dateTime: Date;
  booked: boolean;
}

interface DaySlots {
  date: Date;
  slots: TimeSlot[];
}

@Component({
  selector: 'app-choose-slot',
  templateUrl: './choose-slot.component.html',
  styleUrls: ['./choose-slot.component.scss']
})
export class ChooseSlotComponent implements OnInit {
  doctor!: Doctor;
  currentWeekStart: Date = new Date();
  currentWeekEnd: Date = new Date();
  weekDays: DaySlots[] = []; // <-- تحديد النوع هنا
  selectedSlot: TimeSlot | null = null; // <-- تحديد النوع هنا

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doctor = history.state.doctor;
    
    if (!this.doctor) {
      this.router.navigate(['/doctors']);
      return;
    }

    this.initWeek();
    this.generateSlots();
  }

  initWeek(): void {
    const today = new Date();
    const dayOfWeek = today.getDay();
    this.currentWeekStart = new Date(today);
    this.currentWeekStart.setDate(today.getDate() - dayOfWeek);
    this.currentWeekEnd = new Date(this.currentWeekStart);
    this.currentWeekEnd.setDate(this.currentWeekStart.getDate() + 6);
  }

  generateSlots(): void {
    this.weekDays = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(this.currentWeekStart);
      date.setDate(this.currentWeekStart.getDate() + i);
      
      const slots = this.generateDaySlots(date);
      
      this.weekDays.push({
        date,
        slots
      });
    }
  }

  generateDaySlots(date: Date): TimeSlot[] { // <-- تحديد نوع الإرجاع
    const slots: TimeSlot[] = []; // <-- تحديد النوع هنا
    const startHour = 9;
    const endHour = 17;
    
    for (let hour = startHour; hour <= endHour; hour++) {
      ['00', '30'].forEach(minutes => {
        const time = `${hour}:${minutes}`;
        const booked = Math.random() > 0.7;
        
        slots.push({
          time,
          dateTime: new Date(date.setHours(hour, parseInt(minutes))),
          booked
        });
      });
    }
    
    return slots;
  }

  previousWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.currentWeekEnd.setDate(this.currentWeekEnd.getDate() - 7);
    this.generateSlots();
    this.selectedSlot = null;
  }

  nextWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.currentWeekEnd.setDate(this.currentWeekEnd.getDate() + 7);
    this.generateSlots();
    this.selectedSlot = null;
  }

  selectSlot(slot: TimeSlot): void { // <-- تحديد نوع المعلمة
    if (slot.booked) return;
    this.selectedSlot = slot;
  }

  confirmSelection(): void {
    if (!this.selectedSlot) return;
    
    this.router.navigate(['/confirm'], {
      state: {
        doctor: this.doctor,
        slot: this.selectedSlot
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/doctors']);
  }
}