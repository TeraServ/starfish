import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stream } from '../models/stream.model';
import { quiz } from 'src/model/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseURL = "http://localhost:8080/api/quiz/";

  constructor(private httpClient: HttpClient) { }

  createQuiz(quiz: quiz): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}` + 'new', quiz);
  }

  getQuizList(): Observable<quiz[]> {
    return this.httpClient.get<quiz[]>(`${this.baseURL}` + 'list');
  }

  updateQuiz(quiz:quiz):Observable<any>{
    return this.httpClient.put(`${this.baseURL}`+'update/'+quiz.id,quiz);

  }

  deleteQuiz(id:number){
    return this.httpClient.delete(`${this.baseURL}`+'delete/'+ id)
  }

}
