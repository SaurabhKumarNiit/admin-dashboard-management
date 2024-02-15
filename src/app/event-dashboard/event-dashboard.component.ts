import { Component, NgZone } from '@angular/core';
import { GoogleCalendarService } from '../Services/google-calander.service';
import { ZoomService } from '../Services/zoom.service';
declare var gapi: any;

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.css']
})
export class EventDashboardComponent {

  eventName: string = '';
  eventDateTime: string = '';

  constructor(private googleCalendarService: GoogleCalendarService ,private ngZone:NgZone , private zoomService:ZoomService) {}

  ngAfterViewInit() {
    // Initialize Google Sign-In
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '521757224219-gqn92bql3glpkn1s1g6fjf987m31raki.apps.googleusercontent.com',

      }).then(() => {
        this.ngZone.run(() => {
          // Google Sign-In has been initialized successfully
          console.log('Google Sign-In initialized successfully.');
        });
      }).catch((error: any) => {
        this.ngZone.run(() => {
          // Handle initialization error
          console.error('Error initializing Google Sign-In:', error);
        });
      });
    });
  }

  getToken(){
    this.zoomService.makeRequestWithBasicAuth();
  }

  ngOnInit(): void {
    this.googleCalendarService.loadCalendarApi().then(() => {
      // The Google Calendar API is now loaded, you can use other methods here.
      // For example, you might want to load calendar events or perform other operations.
    }).catch((error) => {
      console.error('Failed to load Google Calendar API:', error);
    });
  }

  createMeeting() {
    // Parse the eventDateTime without using moment.js
    const dateTimeParts = this.eventDateTime.split('T');
    const datePart = dateTimeParts[0];
    const timePart = dateTimeParts[1];

    const isoDateTime = `${datePart}T${timePart}:00.000Z`;

    // Create event details
    const eventDetails = {
      summary: this.eventName,
      start: { dateTime: isoDateTime },
      end: { dateTime: isoDateTime },
      conferenceData: {
        createRequest: { requestId: 'YOUR_REQUEST_ID' }, // Replace with your own request ID
      },
    };

    // Call the Google Calendar service to create the event
    this.googleCalendarService.createEvent(eventDetails);
  }
}