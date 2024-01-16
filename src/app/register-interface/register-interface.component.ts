import { Component, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ApiService } from '../Services/api.service';
import { SharedService } from '../Services/shared.service';
import * as $ from 'jquery';
declare var Razorpay: any;


@Component({
  selector: 'app-register-interface',
  templateUrl: './register-interface.component.html',
  styleUrls: ['./register-interface.component.css'],
})
export class RegisterInterfaceComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private route: Router,
    private sharedService:SharedService
  ) {}


  data: any;
  _id:any;
  totalAmount:any;
  userEmail:any;
  customerName:any;
  MobileNo:any;

  ngOnInit(): void {
    this.sharedService.currentToken.subscribe((GeneretedId: number) => {
      this._id = GeneretedId;
    });

    console.log(this._id);
  }

  registrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNo: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
        ),
      ],
    ]
  });

  get userName() {
    return this.registrationForm.get('userName');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get phoneNo() {
    return this.registrationForm.get('phoneNo');
  }

  verifydata() {
    this.service
      .updateData({
        userName: this.userName?.value,
        email: this.email?.value,
        phoneNo: this.phoneNo?.value,
      },this._id)
      .subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('email',data.email);
          this.totalAmount=data.totalAmount;
          this.userEmail=data.email;
          this.customerName=data.userName;
          this.MobileNo=data.phoneNo;

          Swal.fire({
            title:
              'You are registered SuccessFully',
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
          });
          this.paymentStart();
          this.send();
          this.registrationForm.reset();
          // this.route.navigateByUrl('/login');
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

  async send(){
    emailjs.init('-gTT_FrwJfkh1js-B');
   let response = await emailjs.send("service_2fjea4f","template_ii6fto9" ,{
      from_name:'Admin',
      to_name:this.registrationForm.value.userName,
      form_email:this.registrationForm.value.email,
      totalAmount:this.totalAmount,
      subject:'Admin Greetings',
      message:'Thank You For Using Our Service'
    });
  }


  paymentStart(){
    console.log("payment started --")
    let amount= this.totalAmount;
    console.log(amount);
  
  $.ajax(
    {
      url:'http://localhost:8888/payment/create_order/'+(this.userEmail),
      data:JSON.stringify({amount:amount,info:'order_request'}),
      contentType:'application/json',
      type:'POST',
      dataType:'json',
      success:function(response){
        console.log(response);
  
        if(response.status=="created"){
  
          let options={
            key:'rzp_test_LP91fzOg59Pohi',
            amount:response.amount,
            currency:'INR',
            name:'Admin Payment Gateway',
            description:'No Worries its Secure Payment',
            image:'https://png.pngtree.com/png-vector/20190114/ourmid/pngtree-vector-payment-icon-png-image_313445.jpg',
            order_id:response.id,
            "handler": function (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; }){
  
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);
  
              // console.log("payment successfull !!");
              // alert("Hurray ! Payment Done");
              updatePaymentOnServer(
                response.razorpay_payment_id,
                response.razorpay_order_id,
                "paid"
                );
            
              Swal.fire(
                'Payment Done',
                'Your Order placed check your mail for order information',
                'success'
              )
          
             
          },
          prefill:{
  
            name:this.customerName,
  
            email:this.userEmail,
  
            contact:this.MobileNo
  
          },
          notes:{
            address:"India MP"
          },
          theme:{
            color:"#3399cc"
          }
    
          };
  
          var rzp = new Razorpay(options);
          // this.emptycart();
  
         rzp.on('payment.failed',function(response: { error: { code: any; description: any; source: any; step: any; reason: any; metadata: { order_id: any; }; payment_id: any; }; }){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id)
            alert(response.error.payment_id)
            alert("Oops payment failed !!!!!!1")
         })
           rzp.open();

        }
      },
    
       error:function(error){
         console.log(error)
         alert("sonthing went wrong !!")
       }
    }
  )
    function updatePaymentOnServer(payment_id:any,order_id:any,status:any) 
    {
      $.ajax(
        {
          url:'http://localhost:8888/payment/update_order',
          data:JSON.stringify({payment_id:payment_id,order_id:order_id,statu:status}),
          contentType:'application/json',
          type:'POST',
          dataType:'json',
          success:function(response){
            console.log(response);
            Swal.fire('Hey user!', 'Updation Success', 'success');
          },
          error:function (error){
            Swal.fire('Hey user!', 'Updation Failed', 'info');
          },
          });
    }
  
  };
}


