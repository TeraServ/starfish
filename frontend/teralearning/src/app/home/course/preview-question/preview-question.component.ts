import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/service/question.service';

export const LABELS = {
  pageTitle: 'Question Preview',
  questionType: 'Question Type:',
  questionHeading: 'Question:',
  singleAnswer:` Single Answer`,
  multipleChoice: ` Multiple Choice`,
  multipleSelect:` Multiple Select`,
  option:`Option: `,
  answerHeading: 'Correct Answer:',
  answerExplanationHeading: 'Answer Explanation:',
  noData:`No Data`
}

@Component({
  selector: 'app-preview-question',
  templateUrl: './preview-question.component.html',
  styleUrls: ['./preview-question.component.scss'],
  standalone: false
})
export class PreviewQuestionComponent implements OnInit {


  @Input() questionBody!:any ;
  @Output() saveQuestion: EventEmitter<boolean> = new EventEmitter();

  public readonly labels = LABELS;
  

  ngOnInit(): void {
    console.log(this.questionBody);
  }


  // onBack(){
  // this.saveQuestion.emit(false);
  // }

  onSave(){
    this.saveQuestion.emit(true);

  }

}
