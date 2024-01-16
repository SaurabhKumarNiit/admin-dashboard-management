import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }

  constructor(private activateRoute:ActivatedRoute,private apiService:ApiService) { }

  userinfo:any = { userName: '', email:'', phoneNo:''};

 history : any={};

  activeCustomers:number=0;

  totalVideoRequest:number=0;

  totalFeedbacks: number = 0;


  ngOnInit(): void {
    this.apiService.getAllUserData().subscribe({
      next:data=>{
        console.log(data);
        this.userinfo=data;
      },
      error:e=>{
        console.log('Error');
      }
    });

    this.apiService.getPaymentHistory().subscribe({
      next:data=>{
        console.log(data);
        this.history=data;
      },
      error:e=>{
        console.log('Error');
      }
    });
    
  }

}
