import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userType: boolean[] = []
  currentUserValue(): string {
    return localStorage.getItem("currentUser")!;
  }


  getUserId(){
    return 121;

  }
 

  isLoggedIn() {
    if (localStorage.getItem("currentUser") != null) {
      return true;
    } else {
      return false;
    }
  }
  isTokenExpired(){
    
    const expiry = 12;
    if(expiry * 1000 > Date.now()){
      this.logout()
    }
    else{
      
    }
  }

  url: string = "http://localhost:8080/api/auth/";
  constructor(private httpClient: HttpClient) { }

  userLogin(user: any): Observable<any> {
    return this.httpClient.post(this.url + "login", user);
  }
  logout() {
    localStorage.removeItem("currentUser");
  }
  getCurrentUserDetails(){
    let user = JSON.parse(localStorage.getItem('currentUser')!).body;
    return user;
  }

  getUserTypes() {
    let user = JSON.parse(localStorage.getItem('currentUser')!).message.authorities[0].authority
    this.userType[0] = true;
    if (user == "ROLE_ADMIN") {
      this.userType[1] = true;
      this.userType[2] = true;
      this.userType[3] = true;
      this.userType[4] = true;

    } else if (user == "ROLE_STUDENT") {
      this.userType[1] = false;
      this.userType[2] = false;
      this.userType[3] = false;
      this.userType[4] = true;

    } else if (user == "ROLE_FACULTY") {
      this.userType[1] = true;
      this.userType[2] = false;
      this.userType[3] = true;
      this.userType[4] = true;

    } else {
      this.userType[0] = true;
    }

    return this.userType;
  }
  getUserEmail(){
    return JSON.parse(localStorage.getItem('currentUser')!).message.username;
  }
 
}
