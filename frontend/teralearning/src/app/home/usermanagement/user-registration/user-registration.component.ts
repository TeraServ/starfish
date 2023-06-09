import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }
  userForm!:FormGroup;
  submitted:boolean = false;



  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      userType:['',Validators.required],
      phoneNumber:['',Validators.required],
      stream:['',Validators.required],

    })  
  }
  get f(){return this.userForm.controls}
  createUser(){
    this.submitted = true;

    if(this.userForm.invalid){
      return;
    }
    console.log(this.userForm.value)


  }

}
