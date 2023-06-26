import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserValue(): string {
     return localStorage.getItem("currentUser")!;
  }

  isLoggedIn() {
    if(localStorage.getItem("currentUser") != null){
      return true;
    }else{
      return false;
    }
  }

  url:string = "http://localhost:8080/api/auth/";
  constructor(private httpClient:HttpClient) { }

  userLogin(user:any):Observable<any>{
    return this.httpClient.post(this.url+"login",user);
  }
  logout(){
    localStorage.removeItem("currentUser");
  }
}
