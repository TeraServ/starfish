import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {
  private emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  private mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  constructor() { }
  emailValidator(email:string):boolean{
    let userEmail = new FormControl(email,[Validators.required,
    Validators.pattern(this.emailPattern)])
    return userEmail.valid ? true : false ;
  }

  phoneNumberValidator(phoneNumber:string):boolean{
    let mobnum = new FormControl(phoneNumber, [Validators.required,
    Validators.pattern(this.mobnumPattern)])
    return mobnum.valid ? true : false ;
  }


}
