export class Booking {
    id: number;
    dateTime: string;
    booked: boolean;
  
    constructor(id: number, dateTime: string, booked: boolean) {
      this.id = id;
      this.dateTime = dateTime;
      this.booked = booked;
    }
  }