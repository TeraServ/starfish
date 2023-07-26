import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgetDialogComponent } from '../dialogBoxs/forget-dialog/forget-dialog.component';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  

  constructor(private dialog:MatDialog,private formBuilder:FormBuilder,private authService:AuthService,private snackBar:MatSnackBar,private router:Router) { }

  loginForm!:FormGroup<authModel>;
  submitted:boolean = false;
  
  getEmailDialog(){
    this.dialog.open(ForgetDialogComponent,{
    width:'350px'
    })
  }

  ngOnInit() {

    if(this.authService.isLoggedIn()){
        this.router.navigate(["/home/dashboard"])
    }
    // this.authService.getServerStatus();
    this.loginForm = this.formBuilder.group({
        
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

login() {
    this.submitted = true;
    console.log(this.loginForm)
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }else{
    

        this.authService.userLogin(this.loginForm.value).subscribe(data=>{
          
           if(this.loginForm.get('password')?.value && data.message){
            localStorage.setItem("currentUser",JSON.stringify(data));

            console.log(localStorage.getItem("currentUser"))
            //this.error = false;
           

            this.snackBar.open(data.status,'',{
             duration:5000
            })
            
            this.router.navigate(["/home/dashboard"]).catch(reason=>{
             console.log(reason)
            })
           }
          
           



        },e=>{
        
           this.loginForm.setErrors({
            'invalid-user':"Invalid username or password"
           })
        });
        
    }

  }
}
class authModel{
  username!:any;
  password!:any
}
