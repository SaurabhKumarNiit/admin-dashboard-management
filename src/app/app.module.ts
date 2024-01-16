import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginInterfaceComponent } from './login-interface/login-interface.component';
import { RegisterInterfaceComponent } from './register-interface/register-interface.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { DisplayCustomerDetailsComponent } from './display-customer-details/display-customer-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterAmountComponent } from './register-amount/register-amount.component';
import { BookingComponent } from './booking/booking.component';

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
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
