import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {


  submitted:boolean=false;
  userForm!:FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      userType:['',[Validators.required]],
      userStatus:['',[Validators.required]],
      stream:['',[Validators.required]],
      phoneNumber:['',[Validators.required]]
    })
  }
  get f() {return this.userForm.controls}

  createUser(){

  }


}
