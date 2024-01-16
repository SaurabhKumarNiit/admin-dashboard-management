import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../Services/shared.service';
import emailjs from '@emailjs/browser';
import { UniqueTokenService } from '../Services/unique-token.service';

@Component({
  selector: 'app-register-amount',
  templateUrl: './register-amount.component.html',
  styleUrls: ['./register-amount.component.css']
})
export class RegisterAmountComponent {

  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private route: Router,
    private sharedService:SharedService,
    private uniqueTokenService: UniqueTokenService
  ) {}
  ngOnInit(): void {
    this. getStoredToken();
    this.generateToken()
  }

  generateToken(): void {
    const uniqueToken = this.uniqueTokenService.generateUniqueToken();
    console.log('Generated Token:', uniqueToken);
  }

  getStoredToken(): void {
    const storedToken = this.uniqueTokenService.getStoredToken();
    console.log('Stored Token:', storedToken);
  }

  clearStoredToken(): void {
    this.uniqueTokenService.clearStoredToken();
    console.log('Stored Token Cleared');
  }


  data: any;
  _id:any;

  registrationForm = this.fb.group({
    totalAmount: ['', [Validators.required]],
  });

  get totalAmount() {
    return this.registrationForm.get('totalAmount');
  }

  sendIdToOtpVerify(): void {
    const generatedId = this._id;
   
    this.sharedService.updateToken(generatedId);
  }
async send(){
  emailjs.init('-gTT_FrwJfkh1js-B');
 let response = await emailjs.send("service_2fjea4f","template_ii6fto9" ,{
    from_name:'Admin',
    to_name:'Shubh',
    form_email:'sktiwari1125@gmail.com',
    totalAmount:this.registrationForm.value.totalAmount,
    subject:'Admin Greetings',
    message:'Thank You For Using Our Service'
  });

  alert("Email Has been Send!");
  this.registrationForm.reset();
}
  

  verifydata() {
    this.service
      .registerCustomer({
        totalAmount: this.totalAmount?.value,
      })
      .subscribe(
        (data) => {
          console.log(data);

          this._id=data._id;

          console.log(this._id);

          Swal.fire({
            title:
              'Amount Added Success Share this page to Consumer!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
          });
          this.sendIdToOtpVerify();
          // this.send();
          this.registrationForm.reset();
          this.route.navigateByUrl('/register');
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
  }
}
