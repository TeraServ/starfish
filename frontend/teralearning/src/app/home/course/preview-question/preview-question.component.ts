import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question.model';

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


  @Input() questionBody = {} as Question | undefined;
  @Input() quizId!: Partial<number>;
  @Output() saveQuestion: EventEmitter<boolean> = new EventEmitter();

  public readonly labels = LABELS;

  constructor() {
    setTimeout(()=>{
      console.log(this.questionBody);
      console.log(this.quizId);
    },3000)
   }

  ngOnInit(): void {


  }


  // onBack(){
  // this.saveQuestion.emit(false);
  // }

  onSave(){
    this.saveQuestion.emit(true);

  }

}
