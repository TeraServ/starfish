import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { user } from 'src/model/user.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../../dialogBoxs/success-dialog/success-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userList!: user[];
  DisplayFirstName!:String
  DisplayLastName!:String
  //here we defined a model for avoiding null error in console
  user: user={
    firstName: '',
    lastName: '',
    id: 0,
    email: '',
    userType: 0,
    userStatus: 0,
    phoneNumber: 0,
    category: '',
    stream: undefined,
    modifiedDate: '',
    password: '',
    createdDate: ''
  }
  currentId = 121
  streamUpdate!: boolean;
  isDialogOpen!: boolean;
  streamBtn: boolean = false;
  isDisabled = true;
  readonly = true;
  constructor(private userService: UserService, private snackBar: MatSnackBar, private dialog: MatDialog,) { }

  ngOnInit(): void {

    this.getUsersById(this.currentId);
    if (!this.streamUpdate) {
      this.streamBtn = true
    }
    else{
      this.updateProfile();
    }
    
  }

  editProfile(){
    this.isDisabled = false;
    
    
  }
  getUsersById(id: number) {
    this.userService.getUserById(id).subscribe(data => {
      this.user = data;
      this.DisplayFirstName = this.user.firstName
      console.log(this.user)
    })
  }

  updateProfile(): void {
   
    

    if (this.streamUpdate) {


      this.userService.updateUser(this.user).subscribe((result: any) => {
        
        this.DisplayFirstName = this.user.firstName
        this.dialog.open(SuccessDialogComponent, {

        })
        //  this.dialogRef.close();
        
      })
    }
    else {
     //this.streamBtn = true
      // this.snackBar.open("No changes", '', {
      //   duration: 3000
      // })

    }

  }

  valuechange(newValue: any) {
    this.streamUpdate = true
    if (this.user.firstName == '' || this.user.lastName == '' || this.user.phoneNumber == 0) {
      this.streamBtn = true
    }
    else {
      this.streamBtn = false
    }

  }


 
}
