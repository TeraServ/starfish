import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/model/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url:string = "http://localhost:8080/api/course/";
  constructor(private httpClient:HttpClient) { }
  

  addCourse(body:Course):Observable<any>{
    console.log(body)
    return this.httpClient.post(this.url+"new",body);
  }
  getAllCourse():Observable<any>{
    return this.httpClient.get(this.url+"list");
  }
  getAllCourseByUserId(userId:number):Observable<any>{
    return this.httpClient.get(this.url+"list/"+userId);
  }

  saveChapterByCourseId(data:any):Observable<any>{
    return this.httpClient.put(this.url+"chapter/new",data);
  }
  getChapterByCourseId(id:number):Observable<any>{
    return this.httpClient.get(this.url+"chapter/"+id);
  }
  deleteChapterById(id:number):Observable<any>{
    return this.httpClient.delete(this.url+"chapter/"+id);
  }
}
