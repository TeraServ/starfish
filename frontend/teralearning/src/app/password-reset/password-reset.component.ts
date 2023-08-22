import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from '../core/services/password.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../dialogBoxs/success-dialog/success-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetForm!: FormGroup;
  submitted = false;
  fieldTextType = false;
  token!:string;
  email!:string;
  hasToken!:boolean
  hasEmail!:boolean

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private passwordService: PasswordService,
    private router: Router,
    private dialog:MatDialog,
    private snackbar: MatSnackBar) {
      
    }

  ngOnInit() {
    this.allowAccess();
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordService.passwordMatchValidator
    });
  }

  get f() {
    return this.resetForm.controls;
  }
  allowAccess(){
    //Email and Token Validation
    this.activatedRoute.queryParams.subscribe((params)=>{
      this.token = params['token'];
      this.email = params['email'];
      if(!(this.token || this.email)){
        this.hasToken = false;
        // this.router.navigate(['**'])
      }
      else{
            this.hasToken = true;
            this.passwordService.tokenChecker(this.email,this.token).subscribe((response:any)=>{
          console.log(response);},err =>{
            console.log(err.error);
            if(err.error == "Token Expired" || err.error == null ||err.status == 404 || err.status == 401){

              this.router.navigate([''])
            }
            else{
            }
          })
      }
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.resetForm.invalid) {
      return;
    }

    // Password reset logic
    const newPassword = this.resetForm.value.newPassword;
    this.passwordService.resetPassword(this.email,this.token,newPassword).subscribe(response=>{
      console.log(response);
    },err=>{
      console.log(err);
      if(err.error == 200){
        this.dialog.open(SuccessDialogComponent,{data:"Successfully Changed Password"});
      }
      else{
        this.snackbar.open(err.error.text,'',{duration: 3000})
      }
    }
    )
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
