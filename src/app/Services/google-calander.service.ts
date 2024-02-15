import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var gapi: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private calendarApiLoaded: boolean = false;

  constructor(private http: HttpClient) {}
  private apiLoaded: boolean = false;

  loadCalendarApi(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.apiLoaded) {
        resolve();
        return;
      }

      gapi.load('client:auth2', {
        callback: () => {
          gapi.client.init({
            apiKey: 'AIzaSyDl1uFqB5WrG0Lkm5j7HMKhqE7__B_gpfA',
            clientId: '521757224219-gqn92bql3glpkn1s1g6fjf987m31raki.apps.googleusercontent.com',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: 'https://www.googleapis.com/auth/calendar',
          }).then(() => {
            this.apiLoaded = true;
            resolve();
          }, (error: any) => {
            console.error('Error initializing Google Calendar API:', error);
            reject(error);
          });
        },
        onerror: (error: any) => {
          console.error('Error loading Google Calendar API:', error);
          reject(error);
        },
      });
    });
  }


  // loadCalendarApi(): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     gapi.load('client:auth2', {
  //       callback: () => {
  //         gapi.client.init({
  //           apiKey: 'AIzaSyDS5HglbOWw0b6Geud9wzrddGuYkOUcH6k',
  //           clientId: '249318443467-n1mh98eqh2qaun69ku1iofu39h3tv0h8.apps.googleusercontent.com',
  //           discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  //           scope: 'https://www.googleapis.com/auth/calendar',
  //         }).then(() => {
  //           this.calendarApiLoaded = true;
  //           resolve();
  //         }, (error: any) => {
  //           console.error('Error initializing Google Calendar API:', error);
  //           reject(error);
  //         });
  //       },
  //       onerror: (error: any) => {
  //         console.error('Error loading Google Calendar API:', error);
  //         reject(error);
  //       },
  //     });
  //   });
  // }

  createEvent(eventDetails: any) {
    if (!this.calendarApiLoaded) {
      console.error('Google Calendar API not loaded.');
      return;
    }

    gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: eventDetails,
    }).then((response: any) => {
      const meetLink = response.result.conferenceData.entryPoints.find((entry: any) => entry.entryPointType === 'video').uri;

      console.log(meetLink);
      // Send the meetLink to your backend
      // this.sendMeetLinkToBackend(meetLink);

      console.log('Event created: ', response);
    }, (error: any) => {
      console.error('Error creating event: ', error);
    });
  }

  sendMeetLinkToBackend(meetLink: string) {
    // Make an HTTP request to your backend API to send the meet link
    const backendApiUrl = 'YOUR_BACKEND_API_URL';
    this.http.post(backendApiUrl, { meetLink })
      .subscribe((response: any) => {
        console.log('Meet link sent to backend: ', response);
      }, (error: any) => {
        console.error('Error sending meet link to backend: ', error);
      });
  }
}
