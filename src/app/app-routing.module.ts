import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginInterfaceComponent } from './login-interface/login-interface.component';
import { RegisterInterfaceComponent } from './register-interface/register-interface.component';
import { DisplayCustomerDetailsComponent } from './display-customer-details/display-customer-details.component';
import { RegisterAmountComponent } from './register-amount/register-amount.component';
import { BookingComponent } from './booking/booking.component';
import { EventDashboardComponent } from './event-dashboard/event-dashboard.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'home',component:DashboardComponent},
  {path:'login',component:LoginInterfaceComponent},
  {path:'register',component:RegisterInterfaceComponent},
  {path:'amount',component:RegisterAmountComponent},
  {path:'booking',component:BookingComponent},
  {path:'event',component:EventDashboardComponent},
  {path:'display-details',component:DisplayCustomerDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
