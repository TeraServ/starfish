import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLoggedTime!: number;
  private clearTimeout:any;

  userType: boolean[] = []
  currentUserValue(): string {
    return localStorage.getItem("currentUser")!;
  }
  public setUserLogTime(value:any){
    this.userLoggedTime = value;
  }


  getUserId(){
    return 121;

  }
  LoggedInUserId(){
    let user = JSON.parse(localStorage.getItem('currentUser')!).body;
    return user.id;
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
    }else{ }
  }
  autoLogOut(expirationPeriod: number){
    this.clearTimeout= setTimeout(()=>{
      this.logout();
    },expirationPeriod);
  }

  url: string = "http://localhost:8080/api/auth/";
  constructor(private httpClient: HttpClient) {
    const expireTime = this.userLoggedTime * 1000 * 60 *60*24;
    // this.autoLogOut(expireTime);

   }

  userLogin(user: any): Observable<any> {
    return this.httpClient.post(this.url + "login", user);
  }
  logout() {
    localStorage.removeItem("currentUser");
    if(this.clearTimeout){
      clearTimeout(this.clearTimeout);
    }
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
  getCurrentUserEmail():Email{
    return JSON.parse(localStorage.getItem('currentUser')!).message.username;
  }
 
}
