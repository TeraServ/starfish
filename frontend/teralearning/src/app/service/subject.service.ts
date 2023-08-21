import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../../model/subject.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseURL = "http://localhost:8080/api/subject/";

  constructor(private httpClient: HttpClient) { }

  createSubject(subject: Subject): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}` + 'new', subject);
  }

  getSubject():Observable<Subject[]>{
    return this.httpClient.get<Subject[]>(`${this.baseURL}` + 'list')
  }

  updateSubject(subject:Subject):Observable<any>{
    return this.httpClient.put<Subject>(`${this.baseURL}`+'update/'+subject.id,subject);
  }

  getSubjectByStreamId(id:any):Observable<any>{

    return this.httpClient.get(`${this.baseURL}`+'subjectbystream/'+id)
  }
}
