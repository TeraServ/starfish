import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Stream } from 'src/model/stream.model';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  private baseURL = "http://localhost:8080/api/stream/";

  constructor(private httpClient: HttpClient) { }

  createStream(stream: Stream): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}` + 'new', stream);
  }

  getStreamList(): Observable<Stream[]> {
    return this.httpClient.get<Stream[]>(`${this.baseURL}` + 'list');
  }

  updateStream(stream:Stream):Observable<any>{
    return this.httpClient.put<Stream>(`${this.baseURL}`+'update/'+stream.id,stream);

  }
}
