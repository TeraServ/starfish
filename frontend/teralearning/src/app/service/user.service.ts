import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url:string = "http://localhost:8080/api/user/"
  constructor(private http:HttpClient) { }

  private headers= new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')


  addNewUser(data:any):Observable<any>{
    return this.http.post(this.Url + "new", data);
  }
  addOnlineUser(data:any):Observable<any>{
    return this.http.post(this.Url + "register", data);
  }
  getAllUser():Observable<any>{
    return this.http.get(this.Url+"list");
  }
  getUserById(id:number):Observable<any>{
    return this.http.get(this.Url + id);
  }
  deleteUser(data:number):Observable<any>{
   return this.http.delete(this.Url+"delete/"+data);
  }

  updateUser(data:any):Observable<any>{
    return this.http.put(this.Url+"update",data);
  }
  bulkUserCreate(userList:any[]){
    return this.http.post(this.Url+"create_bulk_user",userList);
  }
  getAllUserStream():Observable<any>{
    return this.http.get(this.Url+"stream", {headers: this.headers,responseType: 'text'});
  }

  findUserByEmail(email:string){
    return this.http.post(this.Url+"userExistByEmail",{email})
  }

  
}
