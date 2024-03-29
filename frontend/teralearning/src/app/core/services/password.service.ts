import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {FormGroup} from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private baseURL= "http://localhost:8080/api/passwordcontroller";
  constructor(private httpClient:HttpClient) {
    
   }
  resetPassword(email:string, validToken: string, newPassword: string){
    const paramsBody = new HttpParams({
      fromObject:{
        email:email,
        token: validToken,
        password: newPassword,
      }
    })
    return this.httpClient.post(`${this.baseURL}/reset_account_password`,null,{params: paramsBody});
  }
  tokenChecker(email: string, token:string):Observable<any>{
    return this.httpClient.get(`${this.baseURL}/reset_password/`+email+`/`+token);
  }
  forgotPassword(validEmail:string):Observable<any>{
    return this.httpClient.post(`${this.baseURL}/forgot_password`,validEmail);
  }   
  generatePassword(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
  
    return password;
  }
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      group.get('confirmPassword')?.setErrors(null);
    }
  }

  
}
