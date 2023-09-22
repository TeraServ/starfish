import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from 'src/model/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {


  private baseURL = "http://localhost:8080/api/topic/";

  constructor(private httpClient: HttpClient) { }

  getSTopicList(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${this.baseURL}` + 'list');
  }

  getFilteredTopic(id:any):Observable<any>{
    return this.httpClient.get(`${this.baseURL}` + 'Filteredlist/'+id)

  }
  getTopicBySubject(id:any):Observable<any>{
    return this.httpClient.get(`${this.baseURL}`+'topicBySubject/'+id);
  }
  createTopic(newTopic:Topic):Observable<any>{
    return this.httpClient.post(`${this.baseURL}`+'new',newTopic);
  }
  updateTopic(updatedTopic:Topic):Observable<any>{
    return this.httpClient.put<Topic>(`${this.baseURL}`+'update/'+updatedTopic.id,updatedTopic);
  }
  deleteTopic(deletedTopic:Topic):Observable<any>{
    return this.httpClient.delete(`${this.baseURL}`+'delete/'+deletedTopic.id);
  }
}
