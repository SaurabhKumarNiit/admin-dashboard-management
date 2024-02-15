import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../Services/booking.service';
import { formatISO, parseISO } from 'date-fns'; // Import from date-fns or another date library
import { DatePipe } from '@angular/common';
import { combineLatest, map } from 'rxjs';
import { Booking } from '../models/booking.model';
import { Router } from '@angular/router';
import { SharedService } from '../Services/shared.service';
import { startOfDay } from 'date-fns';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
// Booking Component
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  availableTimeSlots: string[] = []; // Array to store available time slots
  viewDate: Date = new Date();
  userDate: Date = new Date();
  availableTimeSlotsV2: string[] = [];
  allSlots:any={};
  availableSlot:any={};
  todayDate: Date = new Date('2024-01-20');
  selected:Date = new Date();
  constructor(private bookingService: BookingService,private datePipe:DatePipe ,private router:Router, private sharedService:SharedService) {}
  isLoading: boolean = false;
  uniqueDateTimeArray: string[] = [];


  eventObject:any= {
    sDate: ''
  }

  filteredAvailableTimeSlots: string[] = [];
  onlyBookedTimeSlotsData: Booking | undefined;
  onlyBookedDataWithDate: any;

  initForm() {
    this.bookingForm = new FormGroup({
      date: new FormControl(new Date(), Validators.required),
      timeSlot: new FormControl('', Validators.required),
    });
  }

  onDateChangeV2(selectedDate: string): void {
    // Access the selected date here
    console.log('Selected Date:', selectedDate);

    // You can perform additional logic or update other parts of your application
  }

  onValueChange(value:any){

    this.bookingForm.value.timeSlot=value;
    console.log(value);
  }

  onDateChange(event: Event) {
    const selectedDate = (event.target as HTMLInputElement)?.value;
    const formattedDate:any = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
    this.userDate=formattedDate;
    console.log(this.userDate);
    console.log(formattedDate);
    // const dateObject: Date = new Date(formattedDate);
    if (selectedDate) {
      // Call your logic with the selectedDate
      // this.bookingService.getAvailableTimeSlots(new Date(formattedDate)).subscribe(
        this.bookingService.getAvailableTimeSlotsV2(formattedDate).subscribe(
        (timeSlots) => {
          console.log(timeSlots);
          this.availableSlot = timeSlots;
          console.log(this.availableSlot);
          this.bookingForm.get('timeSlot')?.setValue(''); // Reset time slot selection
        },
        (error) => {
          console.error('Error fetching available time slots', error);
        }
      );
    }
  }



  ngOnInit() {
    this.eventObject.sDate=this.selected;
    console.log(this.eventObject.sDate);
    this.initForm();
    this.loadAvailableTimeSlots();
    this.loadAllSlots();
    // this.availableTimeSlotsModifiedV2();
    this.onlyBookedTimeSlots();
   

    // this.bookingForm = this.formBuilder.group({
    //   date: [new Date(), Validators.required], // Set an initial value or null
    // });

    // React to changes in the date form control
    this.bookingForm?.get('date')?.valueChanges.subscribe((newDate) => {
      this.updateTimeSlots();
      this.fetchFilteredAvailableTimeSlots();

    });

    // Initial load
    this.updateTimeSlots();
    this.fetchFilteredAvailableTimeSlots();
  }

   fetchFilteredAvailableTimeSlots(): void {
    const selectedDate: Date = this.bookingForm?.get('date')?.value;
    console.log(selectedDate);

    // Format the selected date
    const formattedDate:any = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');

    const allTimeSlots$ = this.bookingService.getAllTimeSlots();
    const bookedTimeSlots$ = this.bookingService.newGetAvailableTimeSlots(formattedDate);

    // Combine both observables and filter available time slots
    combineLatest([allTimeSlots$, bookedTimeSlots$])
      .pipe(
        map(([allTimeSlots, bookedTimeSlots]) => {
          // Filter out booked time slots to get available time slots
          // return allTimeSlots.filter(timeSlot => !bookedTimeSlots.includes(timeSlot));
          // console.log(allTimeSlots);
          console.log(bookedTimeSlots.length);
           
            // Filter out booked time slots to get available time slots
            if(bookedTimeSlots.length>1){
              return allTimeSlots.filter(timeSlot => !bookedTimeSlots.includes(timeSlot));
            }else{
              if(bookedTimeSlots.includes('No slots are booked for this day.') || bookedTimeSlots.includes('12:00 pm') || bookedTimeSlots.includes('12:45 pm') || bookedTimeSlots.includes('01:30 pm') || bookedTimeSlots.includes('02:15 pm')){
                  return allTimeSlots.filter(timeSlot => !bookedTimeSlots.includes(timeSlot));
                
              }
              else{
                  return ['Slots available on Wednesdays and Thursdays.'];
              }
             
            }
        
            // No slots booked, return all time slots
            // return  this.availableSlot;
        })
      )
      .subscribe(
        availableTimeSlots => {
          // Now, availableTimeSlots contains only the slots that are not booked
          this.filteredAvailableTimeSlots = availableTimeSlots;
          console.log('Filtered Available Time Slots:', this.filteredAvailableTimeSlots);

        },
        error => {
          console.error('Error fetching time slots:', error);
        }
      );
  }



  updateTimeSlots(): void {
    const selectedDate: Date = this.bookingForm?.get('date')?.value;
    console.log(selectedDate);

    // Format the selected date
    const formattedDate:any = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
    // const formattedDate: string = this.formatDate(selectedDate);
    this.fetchBookedTimeSlots(formattedDate);
    // Get all time slots
    const allTimeSlots$ = this.bookingService.getAllTimeSlots();
 
    const bookedTimeSlots$ = this.bookingService.newGetAvailableTimeSlots(formattedDate);
    // console.log('All booked slots - ',bookedTimeSlots$);

    // Combine both observables
    combineLatest([allTimeSlots$, bookedTimeSlots$]).subscribe(
      ([allTimeSlots, bookedTimeSlots]) => {
        const formattedBookedTimeSlots = bookedTimeSlots.map(timeSlot => {
          const date = new Date(timeSlot);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const ampm = hours >= 12 ? 'am' : 'pm';
          const formattedHours = hours % 12 || 12; 
          return `${('0' + formattedHours).slice(-2)}:${('0' + minutes).slice(-2)} ${ampm}`;
        });

        console.log(formattedBookedTimeSlots);
        this.filteredAvailableTimeSlots = allTimeSlots.filter(
          timeSlot => !formattedBookedTimeSlots.includes(timeSlot)
        );
      },
      error => {
        console.error('Error fetching time slots:', error);
      }
    );
    console.log(this.filteredAvailableTimeSlots);
  }


  private formatDate(date: Date): string {
    // Implement your date formatting logic here
    // Example: return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    return ''; // Implement your own formatting logic
  }

  onlyBookedTimeSlots() {
    // Fetch available time slots for the initial date
    // console.log(this.todayDate)
    const formattedDate:any = this.datePipe.transform(this.todayDate, 'yyyy-MM-ddTHH:mm:ss');
    this.bookingService.getBookedTimeSlots().subscribe(
      (timeSlots) => {
        // console.log('Only Booked Time Slots : '+timeSlots.observables); 
        this.onlyBookedTimeSlotsData = timeSlots
        this.onlyBookedDataWithDate=this.onlyBookedTimeSlotsData;
    
            // console.table(this.onlyBookedTimeSlotsData);
            this.uniqueDateTimeArray = Array.from(new Set(this.onlyBookedDataWithDate?.map((slot: { dateTime: any; }) => slot.dateTime)));
            // console.log(this.uniqueDateTimeArray);
      },
      (error) => {
        console.error('Error fetching available time slots', error);
      }
    );
  }

  // availableTimeSlotsModifiedV2(){
  //   const selectedDate = '2024-01-31';
  //   this.bookingService.newGetAvailableTimeSlots(selectedDate).subscribe(
  //     (timeSlots) => {
  //       this.availableTimeSlotsV2 = timeSlots;
  //       console.log('Available Time Slots Modifies:', this.availableTimeSlots);
  //     },
  //     (error) => {
  //       console.error('Error fetching available time slots:', error);
  //     }
  //   );
  // }

  fetchBookedTimeSlots(date: string): void {
    this.bookingService.newGetAvailableTimeSlots(date)
      .subscribe(
        (bookedTimeSlots: string[]) => {
          // Handle successful response
          this.availableTimeSlotsV2=bookedTimeSlots
          console.log('Booked Time Slots:',  this.availableTimeSlotsV2);
        },
        (error) => {
          // Handle error
          console.error('Error fetching booked time slots:', error);
        }
      );
  }

  loadAvailableTimeSlots() {
    // Fetch available time slots for the initial date
    console.log(this.todayDate)
    const formattedDate:any = this.datePipe.transform(this.todayDate, 'yyyy-MM-ddTHH:mm:ss');
    this.bookingService.getAvailableTimeSlots(new Date(formattedDate)).subscribe(
      (timeSlots) => {
        this.availableSlot = timeSlots;
        console.log(this.availableTimeSlots);
      },
      (error) => {
        console.error('Error fetching available time slots', error);
      }
    );
  }

  loadAllSlots() {
    // Fetch available time slots for the initial date
    this.bookingService.getAllTimeSlots().subscribe(
      (timeSlots) => {
        this.allSlots = timeSlots;
        // console.log(this.allSlots);
      },
      (error) => {
        console.error('Error fetching available time slots', error);
      }
    );
  }


  sendSlotToUser(slot:any): void {
    const generatedId = slot
  //  console.log(slot);
    this.sharedService.updateToken(generatedId);
  }

  // ...
  
  onSubmit() {
   this.isLoading=true;
  
    if (this.bookingForm.value!=null) {
      console.log(this.bookingForm.value);
      const selectedDate = this.bookingForm.value.date;
      const selectedTimeSlot = this.bookingForm.value.timeSlot;
      const formattedDate:any = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');

          // Remove "am" or "pm" from the time slot
    const timeWithoutAmPm = selectedTimeSlot.replace(/\s*(?:a|p)m\s*$/i, '');
    // console.log(timeWithoutAmPm);
      // Combine date and time to form dateTime
      const dateTime = `${formattedDate}T${timeWithoutAmPm}`;
      console.log(dateTime);
      
      // Check if the dateTimeString is a valid ISO 8601 string
      if (!this.isValidISODateTime(dateTime)) {
        console.error('Invalid date-time format:', dateTime);
        return;
      }
  
      // Convert to ISO string using date-fns or another library
      const dateTimeISO = formatISO(parseISO(dateTime));
      this.sendSlotToUser(dateTime);
      // Your service method to send the booking request
      this.isLoading=false;
      this.bookingService.bookTimeSlot({
        // dateTime: dateTimeISO,
        dateTime
      }).subscribe(
        (response) => {
          console.log('Booking successful:', response);
          // Handle success, e.g., show a confirmation message
        }
      );
    } else {
      // Handle form validation errors, if any
    }

    this.navigateToRegister();
  }


  
  // Helper function to check if a string is a valid ISO 8601 date-time
   isValidISODateTime(dateTimeString: string): boolean {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateTimeString);
  }

  navigateToRegister(){
    setTimeout(() => {
      // After 3 seconds, navigate to the '/register' route
      this.router.navigateByUrl('/register');
    }, 3000);
  }

}

