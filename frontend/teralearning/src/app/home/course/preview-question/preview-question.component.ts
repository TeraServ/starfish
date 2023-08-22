import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/service/question.service';

export const LABELS = {
  pageTitle: 'Question Preview',
  contentHeading: 'Question Type:',
  questionHeading: 'Question:',
  answerHeading: 'Answer:',
  answerExplanationHeading: 'Answer Explanation:'
}

@Component({
  selector: 'app-preview-question',
  templateUrl: './preview-question.component.html',
  styleUrls: ['./preview-question.component.scss'],
  standalone: false
})
export class PreviewQuestionComponent implements OnInit {


  @Input() questionBody!:Question ;
  @Output() saveQuestion: EventEmitter<boolean> = new EventEmitter();

  public readonly labels = LABELS;
  
  constructor(private _questionService: QuestionService) {
   }

  ngOnInit(): void {
    console.log(this.questionBody);
    this._questionService.questionData$.subscribe(rxdData =>{
      console.log(rxdData);
      this.questionBody = rxdData;
    })
  }


  // onBack(){
  // this.saveQuestion.emit(false);
  // }

  onSave(){
    this.saveQuestion.emit(true);

  }

}
