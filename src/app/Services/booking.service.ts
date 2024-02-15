// booking.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:8888'; // Replace with your actual backend API URL

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getAvailableTimeSlotsModified(selectedDate: Date): Observable<any> {
    // Format the date using DatePipe
    const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-ddTHH:mm:ss');

    // Make the HTTP request
    const url = `${this.baseUrl}/available-time-slots?date=${formattedDate}`;
    return this.http.get(url);
  }

  getAvailableTimeSlots(date: Date): Observable<any> {
    const formattedDate:any = this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss');
    // console.log(formattedDate);
    const params = new HttpParams().set('date', formattedDate);
    const url = `${this.baseUrl}/available-time-slots`;
    // return this.http.get('/api/bookings/available-time-slots', { params });
    return this.http.get<any>(url,{params});
  }

  getAvailableTimeSlotsV2(date: string): Observable<string[]> {
    const url = `${this.baseUrl}/available-time-slots-modified?date=${date}`;

    // Set headers if needed
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<string[]>(url, { headers });
  }

  
  newGetAvailableTimeSlots(date: string): Observable<string[]> {
    const url = `${this.baseUrl}/booked-time-slots?date=${date}`;

    // Set headers if needed
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<string[]>(url, { headers });
  }
  // getBookedTimeSlots(): Observable<any> {
  //   const url = `${this.baseUrl}/getBookedSlots`;
  //   return this.http.get<any>(url);
  // }

  getBookedTimeSlots(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getBookedSlots`);
  }
  
  getAllTimeSlots(): Observable<string[]> {
    const url = `${this.baseUrl}/allTimeSlot`;
    return this.http.get<string[]>(url);
  }

  bookTimeSlot(formData: any): Observable<any> {
    const url = `${this.baseUrl}/book-time-slot`;
    return this.http.post(url, formData);
  }

  bookTimeSlotV2(requestBody: any): Observable<HttpResponse<string>> {
    const url = `${this.baseUrl}/book-time-slot`;

    // Set headers to accept text response
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/plain',
    });

    return this.http.post<string>(url, requestBody, { headers, observe: 'response' });
  }


  private formatDate(date: Date): string {
    // Implement your date formatting logic here
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
