import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordService } from 'src/app/core/services/password.service';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { StreamService } from 'src/app/service/stream.service';
import { UserService } from 'src/app/service/user.service';
import { Stream } from 'src/model/stream.model';
import {  UserTypeEnum, user } from 'src/model/user.model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private userService:UserService,private snackBar:MatSnackBar,private dialog:MatDialog,private streamService:StreamService, private _passwordService: PasswordService) { }    userForm!:FormGroup;
  public submitted:boolean = false;
  public streamList:Stream[]=[]
  public readonly userTypes = UserTypeEnum;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      userType:['',Validators.required],
      phoneNumber:['',[Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
      stream:['',Validators.required],

    })  
    this.getAllStreams();
  }

  getAllStreams(){
       this.streamService.getStreamList().subscribe(data=>{
         this.streamList = data;
        })
       }

  get f(){return this.userForm.controls}
  createUser(){
    console.log(this.userForm.get('userType')?.errors?.['required'] == true);
    this.submitted = true;

    if(this.userForm.invalid){
      return;
    }

    let userData:user ={
      id:0,
      firstName:this.userForm.get('firstName')?.value,
      lastName:this.userForm.get('lastName')?.value,
      userStatus:103,
      userType:parseInt(this.userForm.get('userType')?.value),
      modifiedDate:"",
      email:this.userForm.get('email')?.value,
      phoneNumber: this.userForm.get('phoneNumber')?.value,
      category: "classroom",
      stream: this.userForm.get('stream')?.value,
      password:this._passwordService.generatePassword(10),
      createdDate:""

    }
    console.log(this.userForm.value)

    this.userService.addNewUser(userData).subscribe(data=>{
     
      this.dialog.open(SuccessDialogComponent,{data:{message:"Successfully created"}})
      
    },err=>{
      this.snackBar.open(err.error,'',{duration:3000})
      console.log(err)
    })
    this.userForm.reset()
    console.log(this.userForm.value)


  }

}