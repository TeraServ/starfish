import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PasswordService } from 'src/app/core/services/password.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forget-dialog',
  templateUrl: './forget-dialog.component.html',
  styleUrls: ['./forget-dialog.component.scss']
})
export class ForgetDialogComponent implements OnInit {
  forgetPasswordForm!: FormGroup;
  submitted!:boolean;

  constructor(private dialogRef:MatDialogRef<ForgetDialogComponent>,
    private passwordService: PasswordService,
    private formBuilder:FormBuilder,
    private dialog:MatDialog,
    private snackbar: MatSnackBar) {
      
     }

  ngOnInit(): void {
    
    this.forgetPasswordForm = this.formBuilder.group({
      email: this.formBuilder.control('',Validators.compose([
        Validators.required,
        Validators.email
      ]))
    })
  }
  get f(){
    return this.forgetPasswordForm.controls; 
  }

  closeDialog(){
    this.dialogRef.close();
  }
  requestPasswordReset(){
    this.submitted = true;
    if(this.forgetPasswordForm.invalid){
      return;
    }else{
      const email = this.forgetPasswordForm.value.email;
      this.passwordService.forgotPassword(email).subscribe(data=>{
      },err=>{
        console.log(err);
        if(err.status == 200){
          this.dialog.open(SuccessDialogComponent,{data:"Email Send Successfully"})
        }
        if(err.status == 400){
          this.snackbar.open(err.error,'',{duration: 3000})
        }
      })
      // this.forgetPasswordForm.reset()
      this.dialogRef.close();
   
    }


  }

}
