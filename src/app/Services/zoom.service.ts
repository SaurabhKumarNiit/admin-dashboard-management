import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  private apiUrl = '/api/oauth/token';

  constructor(private http: HttpClient) {}

  // Function to make an HTTP request with Basic Authentication
  makeRequestWithBasicAuth(): void {
    // Combine the username and password into a string
    const credentials = `${"GAJ2_ZW6TPhMRfQLxJBJQ"}:${"ix38Jzmp8hBiA92k49EIUze4vPWsQ0pd"}`;

    // Encode the credentials using Base64 encoding
    const base64Credentials = btoa(credentials);

    // Set up the headers with Basic Authentication
    const headers = new HttpHeaders({
      Authorization: `Basic ${base64Credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // Set up the body parameters using HttpParams
    const body = new HttpParams()
      .set('code', 'h3rFBBly8h2k2bbzE1gT1afcwcOrO2Mdw')
      .set('redirect_uri', 'https://www.google.com/')
      .set('grant_type', 'authorization_code');

    // Your HTTP request
    this.http.post(this.apiUrl, body.toString(), { headers }).subscribe(
      (response) => {
        console.log('Request successful:', response);
      },
      (error) => {
        console.error('Error in the request:', error);
      }
    );
  }
}
