import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizDataTransferService {
  private dataQuiz = new BehaviorSubject<any>(null);
  public data$ = this.dataQuiz.asObservable();

  passData(data: any) {
    this.dataQuiz.next(data);
  }

  constructor() { }
}
