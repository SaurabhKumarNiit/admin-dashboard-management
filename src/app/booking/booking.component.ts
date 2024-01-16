import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../Services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
// Booking Component
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  availableTimeSlots: string[] = []; // Array to store available time slots

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.initForm();
    this.loadAvailableTimeSlots();
  }

  initForm() {
    this.bookingForm = new FormGroup({
      date: new FormControl('', Validators.required),
      timeSlot: new FormControl('', Validators.required),
    });
  }

  loadAvailableTimeSlots() {
    // Fetch available time slots for the initial date
    this.bookingService.getAvailableTimeSlots(new Date()).subscribe(
      (timeSlots) => {
        this.availableTimeSlots = timeSlots;
      },
      (error) => {
        console.error('Error fetching available time slots', error);
      }
    );
  }

  onDateChange(event: Event) {
    const selectedDate = (event.target as HTMLInputElement)?.value;
    if (selectedDate) {
      // Call your logic with the selectedDate
      this.bookingService.getAvailableTimeSlots(new Date(selectedDate)).subscribe(
        (timeSlots) => {
          this.availableTimeSlots = timeSlots;
          this.bookingForm.get('timeSlot')?.setValue(''); // Reset time slot selection
        },
        (error) => {
          console.error('Error fetching available time slots', error);
        }
      );
    }
  }
  

  onSubmit() {
    const formData = this.bookingForm.value;
    // Send HTTP POST request to book the selected time slot
    this.bookingService.bookTimeSlot(formData).subscribe(
      (response) => {
        // Handle success
        console.log('Time slot booked successfully', response);
        // Update UI to remove booked time slot
        this.availableTimeSlots = this.availableTimeSlots.filter(
          (slot) => slot !== formData.timeSlot
        );
      },
      (error) => {
        console.error('Error booking time slot', error);
      }
    );
  }
}

