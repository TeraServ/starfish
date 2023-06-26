import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private baseURL= "http://localhost:4200/api/passwordcontroller";
  constructor(private httpClient:HttpClient) { }
  resetPassword(email:string, validToken: string, newPassword: string){
    const paramsBody = new HttpParams({
      fromObject:{
        email:email,
        token: validToken,
        password: newPassword,
      }
    })
    return this.httpClient.post(`${this.baseURL}/reset_password`,null,{params: paramsBody});
  }
  tokenChecker(email: string, token:string):Observable<any>{
    return this.httpClient.get(`${this.baseURL}/reset_password/`+email+`/`+token);
  }
  forgotPassword(validEmail:string):Observable<any>{
    return this.httpClient.post(`${this.baseURL}/forgot_password`,validEmail);
  }    
}
