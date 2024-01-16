import { Component, OnInit } from '@angular/core';
import { FormBuilder,NgForm,Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { ApiService } from '../Services/api.service';


@Component({
  selector: 'app-login-interface',
  templateUrl: './login-interface.component.html',
  styleUrls: ['./login-interface.component.css']
})
export class LoginInterfaceComponent implements  OnInit {
  
 
  constructor(private service :ApiService,private fb : FormBuilder, private router : Router) { }

  loginForm = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  })
  get email() { return this.loginForm.get("email") }
  get password() { return this.loginForm.get("password") }

  user:any;
  loggedIn:any;
 
  saveGoogleData() {

    console.log(this.user.email);
    
  }
 
  ngOnInit() {

  }


  loginUser: any = { id: '', name:'', email:'',photoUrl:''};

  data: any;
  decodeData: any;
  userEmail : any;

check(){
  console.log('Response from server:', this.loginForm.value);
}


  // onSubmit() {
  //   this.service.loginCustomer(this.loginForm.value).subscribe(response => {
  //     console.log('Response from server:', this.loginForm.value);
  //     console.log('Response from server:', response);
  //     this.router.navigateByUrl('home');
      
  //   });
  // }




  logindata(){
    this.service.loginCustomer(this.loginForm.value).subscribe(
      res => {
        console.log(this.loginForm.value);
             console.log(res);
            //  this.data = res;

            //  console.log(this.data.token);
            //  this.decodeData = jwt_decode(this.data.token);
            //  console.log(this.decodeData);

            //  this.userEmail = this.decodeData.sub;
             console.log(this.email);
             localStorage.setItem('email',this.userEmail);
            //  localStorage.setItem('jwt',this.data.token);

             Swal.fire({
              title: 'You are Logged In Successfully',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })

            this.router.navigateByUrl('/home');

            //  window.location.reload();
     },
     error=>
     {
      Swal.fire({
        icon: 'error',
        title: 'Failed...',
        text: 'Please Enter Correct Email and Password!',
      })
     }
     )   
  }


}
