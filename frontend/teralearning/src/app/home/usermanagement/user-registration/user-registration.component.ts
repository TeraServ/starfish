import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClearFormDialogComponent } from 'src/app/dialogBoxs/clear-form-dialog/clear-form-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { StreamService } from 'src/app/service/stream.service';
import { UserService } from 'src/app/service/user.service';
import { Stream } from 'src/model/stream.model';
import { user } from 'src/model/user.model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private snackBar: MatSnackBar, private dialog: MatDialog, private streamService: StreamService) { } userForm!: FormGroup;
  submitted: boolean = false;
  streamList: Stream[] = [];


  ngOnInit(): void {
    this.buildForm();
    this.getAllStreams();
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      userType: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      stream: ['', Validators.required],
    })
  }

  getAllStreams() {
    this.streamService.getStreamList().subscribe(data => {
      this.streamList = data;
    })
  }

  get f() { return this.userForm.controls }

  createUser() {
    this.markAsTouched(this.userForm);
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    let userData: user = {
      id: 0,
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      userStatus: 103,
      userType: this.userForm.get('userType')?.value,
      modifiedDate: "",
      email: this.userForm.get('email')?.value,
      phoneNumber: this.userForm.get('phoneNumber')?.value,
      category: "classroom",
      stream: this.userForm.get('stream')?.value,
      password: "dsgvdfvb",
      createdDate: ""

    }
    this.userService.addNewUser(userData).subscribe(data => {
      this.dialog.open(SuccessDialogComponent, { data: { message: "User created Successfully" } })
    }, err => {
      this.snackBar.open(err.error, '', { duration: 3000 })
      console.log(err)
    })
    this.clearValidations();

  }

  clearValidations(): void {
    this.userForm.reset();
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.markAsUntouched();
      this.userForm.get(key)?.markAsPristine();
    })
    this.submitted = false;
    this.buildForm();
  }

  cancelDetails() {
    const dialogRef = this.dialog.open(ClearFormDialogComponent)
      .afterClosed().subscribe(data => {
        if (data.shouldClearForm) {
          this.clearValidations();
        }
      });
  }

  markAsTouched(formGroup: FormGroup) {
    formGroup.markAsTouched({ onlySelf: true });
    Object.keys(formGroup.controls).map((field) => {
      const control:any = formGroup.get(field);
      if (control instanceof FormControl || control instanceof FormArray || control) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.markAsTouched(control);
      }
    });
  }

}