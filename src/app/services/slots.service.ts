import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Slot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  doctorId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SlotsService {
  private slotsSubject = new BehaviorSubject<Slot[]>([]);
  public slots$ = this.slotsSubject.asObservable();

  private availableSlotsSubject = new BehaviorSubject<Slot[]>([]);
  public availableSlots$ = this.availableSlotsSubject.asObservable();

  constructor() {
    this.initializeSlots();
  }

  private initializeSlots() {
    // Initialize with sample slots
    const slots: Slot[] = [
      { id: '1', date: '2024-01-15', time: '09:00', available: true },
      { id: '2', date: '2024-01-15', time: '10:00', available: true },
      { id: '3', date: '2024-01-15', time: '11:00', available: false },
      { id: '4', date: '2024-01-15', time: '12:00', available: true },
      { id: '5', date: '2024-01-15', time: '14:00', available: true },
      { id: '6', date: '2024-01-15', time: '15:00', available: false },
      { id: '7', date: '2024-01-15', time: '16:00', available: true },
      { id: '8', date: '2024-01-16', time: '09:00', available: true },
      { id: '9', date: '2024-01-16', time: '10:00', available: true },
      { id: '10', date: '2024-01-16', time: '11:00', available: true }
    ];
    this.slotsSubject.next(slots);
    this.updateAvailableSlots();
  }

  getAllSlots(): Observable<Slot[]> {
    return this.slots$;
  }

  getAvailableSlots(): Observable<Slot[]> {
    return this.availableSlots$;
  }

  updateAvailableSlots() {
    const allSlots = this.slotsSubject.value;
    const availableSlots = allSlots.filter(slot => slot.available);
    this.availableSlotsSubject.next(availableSlots);
  }

  bookSlot(slotId: string): boolean {
    const slots = this.slotsSubject.value;
    const slotIndex = slots.findIndex(s => s.id === slotId);
    
    if (slotIndex !== -1 && slots[slotIndex].available) {
      slots[slotIndex].available = false;
      this.slotsSubject.next([...slots]);
      this.updateAvailableSlots();
      return true;
    }
    return false;
  }

  cancelBooking(slotId: string): boolean {
    const slots = this.slotsSubject.value;
    const slotIndex = slots.findIndex(s => s.id === slotId);
    
    if (slotIndex !== -1) {
      slots[slotIndex].available = true;
      this.slotsSubject.next([...slots]);
      this.updateAvailableSlots();
      return true;
    }
    return false;
  }

  addSlot(slot: Omit<Slot, 'id'>): Slot {
    const slots = this.slotsSubject.value;
    const newSlot: Slot = {
      ...slot,
      id: Date.now().toString()
    };
    slots.push(newSlot);
    this.slotsSubject.next([...slots]);
    this.updateAvailableSlots();
    return newSlot;
  }

  getSlotsByDate(date: string): Slot[] {
    return this.slotsSubject.value.filter(slot => slot.date === date);
  }
}
