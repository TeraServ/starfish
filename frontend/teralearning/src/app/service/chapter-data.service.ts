import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterDataService {

  constructor(private httpClient:HttpClient) { }

   url:string = "http://localhost:8080/api/chapterBody/";


   addChapterPageAndQuiz(id:any,data:any):Observable<any>{
    return this.httpClient.post(this.url+id+"/new",data);
   }
   getChapterData(chapterId:any):Observable<any>{
    return this.httpClient.get(this.url+chapterId+"/all");

   }
   
}
