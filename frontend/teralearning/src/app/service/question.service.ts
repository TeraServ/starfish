import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseURL:string = "http://localhost:8080/api/quizcontroller/"
  constructor(private http:HttpClient) { }


  defaultQuestionType:string = 'singleAnswer'
  hasDefaultQuestionType:boolean = this.defaultQuestionType.length!=0 ? true : false; 

  questionForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    questionType: new FormControl('',Validators.required),
    questionText: new FormControl('',Validators.required),
    answer: new FormControl('',Validators.required),
    mcqOptions: new FormArray([]),
    msqOptions: new FormArray([]),
    answerExplanation: new FormControl('',Validators.required),
    isSingleAnswer: new FormControl(this.hasDefaultQuestionType)
  });


  initializeFormGroup() {
    this.questionForm.setValue({
      $key: null,
      questionType: this.defaultQuestionType,
      answerExplanation:'',
      isSingleAnswer: false
    });
  }

  createNewQuestion(newQuestion: any): Observable<any>{
    return this.http.post(this.baseURL+"addQuestion",newQuestion);
  }


}
