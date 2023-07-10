import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { StreamService } from 'src/app/service/stream.service';
import { UserService } from 'src/app/service/user.service';
import { Stream } from 'src/model/stream.model';
import { user } from 'src/model/user.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: user,private dialog:MatDialog,private dialogRef: MatDialogRef<UserUpdateComponent>,private snackBar:MatSnackBar,private formBuilder:FormBuilder,private userService:UserService,private streamService:StreamService) { }
  userForm!:FormGroup;
  submitted:boolean = false;
  streamList:Stream[]=[];
  valueChanged:boolean = false;

  @Input() updateData!:any;
  ngOnInit(): void {
   // console.log(this.data);

    this.userForm = this.formBuilder.group({
      firstName:[this.data?.firstName,[Validators.required]],
      lastName:[this.data?.lastName,[Validators.required]],      
      stream:[this.data.stream,[Validators.required]],
      phoneNumber:[this.data?.phoneNumber,[Validators.required]],
      userStatus:[this.data?.userStatus,[Validators.required]],
      userType:[this.data?.userType,[Validators.required]]


    })
    this.getAllStreams();

    this.userForm.valueChanges.subscribe(change=>{
      this.valueChanged =true;
    })
  }

  getAllStreams(){
    this.streamService.getStreamList().subscribe(data=>{
      this.streamList = data;
    })
  }
  get f() {return this.userForm.controls}

  updateUser(){
    this.submitted = true;
    this.data.stream= this.userForm.get('stream')?.value
    if(this.userForm.invalid){
      return;
    }

    let userData:user ={
      id:this.data.id,
      firstName:this.userForm.get('firstName')?.value,
      lastName:this.userForm.get('lastName')?.value,
      userStatus:this.userForm.get('userStatus')?.value,
      userType:this.userForm.get('userType')?.value,
      modifiedDate:this.data.modifiedDate,
      email:this.data.email,
      phoneNumber: this.userForm.get('phoneNumber')?.value,
      category: this.data.category,
      stream: this.userForm.get('stream')?.value,
      password:this.data.password,
      createdDate:this.data.createdDate

    }
    // console.log("userData"+JSON.stringify(userData))
    // console.log("data"+JSON.stringify(this.data));
   if(this.valueChanged){
    this.userService.updateUser(userData).subscribe(data=>{
      this.dialogRef.close();
      // this.snackBar.open("Successfully updated!!",'',{duration:3000});
      this.dialog.open(SuccessDialogComponent,{
        data:{message:"Succesfully updated!"}
      })
      
     // this.userForm.reset()
     
    },err=>{
      this.snackBar.open(err.error.text,'',{duration:3000})
      console.log(err)
    })
   }else{
  this.snackBar.open("No changes!",'',{duration:3000});
   }

  }
}
