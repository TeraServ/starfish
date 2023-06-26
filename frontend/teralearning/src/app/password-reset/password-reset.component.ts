import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  resetForm!: FormGroup;
  submitted = false;
  error:boolean = false;
  fieldTextType!: boolean;
  errMessage!:string;

  constructor(private formBuilder: FormBuilder){
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
  });
  }
  ngOnInit() {
    
      
  }
  get f() { return this.resetForm.controls; }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  onSubmit() {
    this.submitted = true;
  }

}
