import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { topic } from 'src/model/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {


  private baseURL = "http://localhost:8080/api/topic/";

  constructor(private httpClient: HttpClient) { }

  getSTopicList(): Observable<topic[]> {
    return this.httpClient.get<topic[]>(`${this.baseURL}` + 'list');
  }

  getFilteredTopic(id:any):Observable<any>{
    return this.httpClient.get(`${this.baseURL}` + 'Filteredlist/'+id)

  }
}
