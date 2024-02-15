import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginInterfaceComponent } from './login-interface/login-interface.component';
import { RegisterInterfaceComponent } from './register-interface/register-interface.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { DisplayCustomerDetailsComponent } from './display-customer-details/display-customer-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterAmountComponent } from './register-amount/register-amount.component';
import { BookingComponent } from './booking/booking.component';
import { DatePipe } from '@angular/common';
import { SelectedUserComponent } from './selected-user/selected-user.component';
import { EventDashboardComponent } from './event-dashboard/event-dashboard.component';
import { TeamOrganizerComponent } from './team-organizer/team-organizer.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginInterfaceComponent,
    RegisterInterfaceComponent,
    PaymentGatewayComponent,
    DisplayCustomerDetailsComponent,
    NavbarComponent,
    FooterComponent,
    RegisterAmountComponent,
    BookingComponent,
    SelectedUserComponent,
    EventDashboardComponent,
    TeamOrganizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
