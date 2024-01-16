// booking.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'https://your-backend-api-url'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) {}

  getAvailableTimeSlots(date: Date): Observable<string[]> {
    const formattedDate = this.formatDate(date);
    const url = `${this.baseUrl}/api/available-time-slots?date=${formattedDate}`;
    return this.http.get<string[]>(url);
  }

  bookTimeSlot(formData: any): Observable<any> {
    const url = `${this.baseUrl}/api/book-time-slot`;
    return this.http.post(url, formData);
  }

  private formatDate(date: Date): string {
    // Implement your date formatting logic here
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
