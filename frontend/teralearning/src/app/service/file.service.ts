import { HttpClient } from '@angular/common/http';
import { Injectable, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url:string = "http://localhost:8080/api/file/";
  constructor(private httpClient:HttpClient,private sanitizer:DomSanitizer) { }
  

  uploadCoverImage(body:FormData):Observable<any>{


    return this.httpClient.post(this.url+"coverImage",body);
  }

  getImageById(Id:any):Observable<any>{
   
    return this.httpClient.get(this.url+"image/"+Id,{responseType:"blob"});
   
  }
}
