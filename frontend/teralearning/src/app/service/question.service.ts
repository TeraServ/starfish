import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Question } from '../models/question.model';
import { BehaviorSubject } from 'rxjs';
import { QuestionType } from '../models/questionDetailEnum';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseURL = "http://localhost:8080/api/quiz/"
  private defaultQuestion: Question = {} as Question;
  private questionSource = new BehaviorSubject<Question>(this.defaultQuestion);
  questionData$ = this.questionSource.asObservable();
  sendQuestion(newQuestion: Question) {
    this.questionSource.next(newQuestion);
  }
  constructor(private httpClient: HttpClient) { }

  defaultQuestionType: string = QuestionType.singleAnswer;
  hasDefaultQuestionType: boolean = this.defaultQuestionType.length != 0 ? true : false;

  questionForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    questionType: new FormControl('', Validators.required),
    questionText: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
    mcqOptions: new FormArray([]),
    msqOptions: new FormArray([]),
    answerExplanation: new FormControl('', Validators.required),
    isSingleAnswer: new FormControl(this.hasDefaultQuestionType)
  });


  initializeFormGroup() {
    this.questionForm.setValue({
      $key: null,
      questionType: this.defaultQuestionType,
      answerExplanation: '',
      isSingleAnswer: false
    });
  }

  addNewQuestion(newQuestion: Question): Observable<any> {
    return this.httpClient.post(this.baseURL + "addQuestion", newQuestion);
  }

  deleteQuestion(id: number) {

    return this.httpClient.delete(`${this.baseURL}` + 'deleteQuestion/' + id)
  }

  getQuestionList(id: number): Observable<any> {
    return this.httpClient.get<Question[]>(`${this.baseURL}` + 'questionList/' + id);
  }

  updateQuestion(question: Question): Observable<any> {
    return this.httpClient.put(`${this.baseURL}` + 'updateQuestion/' + question.id, question);

  }
}
