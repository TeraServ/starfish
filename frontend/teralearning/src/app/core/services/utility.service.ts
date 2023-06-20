import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from 'app/models/review.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private baseURL= "http://localhost:4200/api/review";
  constructor(private httpClient:HttpClient) { }
  getAllReview():Observable<any>{
    return this.httpClient.get(`${this.baseURL}/listall`);
  }
  postNewReview(newReview: Review):Observable<any>{
    return this.httpClient.get(`${this.baseURL}/new`);
  }
}
