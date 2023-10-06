import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private baseURL = "http://localhost:8080/api/quiz/";

  constructor(private _httpClient: HttpClient) { }
  getDefaultQuestionConfigs():Observable<any>{
    return this._httpClient.get(`${this.baseURL}`+"default-question-configs");
  }
}
