import { Subscription, takeUntil } from 'rxjs';
import { Component, Inject, Input, OnInit, Optional, Renderer2, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StreamService } from 'src/app/service/stream.service';
import { SubjectService } from 'src/app/service/subject.service';
import { quiz } from 'src/model/quiz.model';
import { Stream } from 'src/model/stream.model';
import { Subject } from 'src/model/subject.model';
import { Topic } from 'src/model/topic.model';
import { StreamEditComponent } from '../../streams/stream-edit/stream-edit.component';
import { QuizService } from 'src/app/service/quiz.service';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizDataTransferService } from 'src/app/service/quiz-data-transfer.service';
import { TopicService } from 'src/app/service/topic.service';
import { AddQuestionComponent } from '../../course/add-question/add-question.component';
import { DeleteDialogComponent } from 'src/app/dialogBoxs/delete-dialog/delete-dialog.component';
import { EditQuestionComponent } from '../edit-question/edit-question.component';
import { QuestionService } from 'src/app/service/question.service';
import { Question } from 'src/app/models/question.model';
import { ClearFormDialogComponent } from 'src/app/dialogBoxs/clear-form-dialog/clear-form-dialog.component';
import { InvalidFieldFocusDirective } from 'src/app/custom-directives/invalidfieldfocus.directive';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  isAlert = false;
  quizUpdate: boolean = false;
  quizBtn: boolean = false;
  streamList: Stream[] = [];
  questionList: Question[] = [];
  FilteredsubjectList: Subject[] = [];
  FilteredtopicList: Topic[] = [];
  EditQuiz!: quiz
  UpdatedStream!: string;
  UpdatedSubject!: string;
  UpdatedTopic: Topic = {
    id: 0,
    topicName: '',
    subject: new Subject
  };
  UpdatedQuizName!: string;
  UpdatedPassCriteria!: number;
  UpdatedTotalNoOfQuestion!: number;
  UpdatedModifier!: number;
  UpdatedAllowRetake!: boolean;
  UpdatedStreamId!: any;
  UpdatedSubjectId!: any;
  UpdatedTopicId!: any;
  isActive!: any;
  private subscriptions!:Subscription;

  @ViewChild(InvalidFieldFocusDirective)
  invalidInputDirective!: InvalidFieldFocusDirective;
  @ViewChildren(NgControl) formControls!: QueryList<NgControl>;

  constructor(private dialog: MatDialog, private router: Router, private streamService: StreamService,
    private subjectService: SubjectService, private snackBar: MatSnackBar, private quizService: QuizService,
    private route: ActivatedRoute, private quizDataTransfer: QuizDataTransferService, private topicService: TopicService,
    private dialogService: MatDialog, private questionService: QuestionService) {
  }



  ngOnInit(): void {
   this.initializeEditsForQuestions();
   this.getParamsFromRoute();
   this.getQuizDataFromDataService();
   this.toggleQuizEdit();
  this.passDataToUpdateBody()
  this.getStreams();
  this.getSubjectList();
  this.getTopicList();
  this.getQuestion();
  }
  passDataToUpdateBody(){
    this.UpdatedQuizName = this.EditQuiz?.quizName;
    this.UpdatedPassCriteria = this.EditQuiz?.passCriteria;
    this.UpdatedTotalNoOfQuestion = this.EditQuiz?.TotalNoOfQuestion;
    this.UpdatedModifier = this.EditQuiz?.modifier;
    this.UpdatedAllowRetake = this.EditQuiz?.allowRetake;
  }
  toggleQuizEdit(){
    if (!this.quizUpdate) {
      this.quizBtn = true
    }
    else {
      this.UpdateQuizDetails();
    }
  }

  getParamsFromRoute(){
    const quizName = this.route.snapshot.paramMap.get('quizName');
    console.log(quizName);
    //this.getQuizDataFromDataService();
  }       
  initializeEditsForQuestions(){
    this.isActive = new Array<boolean>(this.questionList.length);
    this.isActive.fill(false);
  }
  getQuizDataFromDataService(){
    this.subscriptions= this.quizDataTransfer.data$.subscribe(receivedData => {
      if (receivedData) {
        this.EditQuiz = receivedData;
        this.UpdatedStreamId = this.EditQuiz?.topic.subject.stream.id;
        this.UpdatedSubjectId = this.EditQuiz?.topic?.subject?.id
        this.UpdatedTopicId = this.EditQuiz.topic?.id;
      }
    });
  }


  getQuestion() {
    this.subscriptions = this.questionService.getQuestionList(this.EditQuiz.id).subscribe(data => {
      this.questionList = data.body;
    });

  }


  
  openDeleteDialog(deleteItem1: Question): void {
    this.subscriptions = this.dialog.open(DeleteDialogComponent, {
      data: { id: deleteItem1.id, innerHTMLContent: `Are you sure want to delete the question ${deleteItem1.questionText}`, funId: 2 , deleteItem:deleteItem1},
    }).afterClosed().subscribe(data => {    
      this.getQuestion();
    });



  }

  openEditQuestionDialog(question: Question) {
    this.subscriptions =  this.dialog.open(EditQuestionComponent, {
      width: "800px",
      height: "500px",
      data: question

    }).afterClosed().subscribe(data => {
      this.getQuestion();
    })
  }
  getQuestionList(i: number) {
    this.isActive[i] = !this.isActive[i];
    const accordion = document.getElementsByClassName('contentBx') as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < accordion.length; i++) {
      accordion[i].addEventListener('click', function (this: HTMLElement) {
        this.classList.toggle('active');
      });

    }
  }

  getStreams() {
    this.subscriptions=  this.streamService.getStreamList().subscribe(data => {
      this.streamList = data
    })
  }

  onStreamChange($event: any) {
    if (this.UpdatedStreamId) {
      this.getSubjectList();
      this.onSubjectChange(null);
      this.UpdatedSubjectId = '';
    }
  }
  getSubjectList() {

    this.subjectService.getFilteredSubject(this.UpdatedStreamId).subscribe((data) => {
      this.FilteredsubjectList = data.body;

    })
  }
  onSubjectChange($event: any) {
    if (this.UpdatedSubjectId) {
      this.getTopicList();
      this.UpdatedTopicId = '';
    }
  }
  getTopicList() {
    this.topicService.getFilteredTopic(this.UpdatedSubjectId).subscribe((data) => {
      this.FilteredtopicList = data;
    })

  }
  AddaQuestion() {
    this.subscriptions= this.dialog.open(AddQuestionComponent,{
      width: "800px",
      height: "500px",
      data: this.EditQuiz
    }).afterClosed().subscribe(data => {    
      this.getQuestion();
    });

  }

  valuechange(newValue: any) {
    this.quizUpdate = true
    if (this.UpdatedStreamId == '' || this.UpdatedSubjectId == '' || this.UpdatedTopicId == '' || this.UpdatedQuizName == '' || this.UpdatedPassCriteria <= 0) {
      this.quizBtn = true
    }
    else {
      this.quizBtn = false
    }

  }

  nullCheck(){
    return this.UpdatedStreamId == '' || this.UpdatedSubjectId == '' || this.UpdatedTopicId == '' || this.UpdatedQuizName == '' || this.UpdatedPassCriteria <= 0
    
  }

  UpdateQuizDetails() {
    const isNull = this.nullCheck();
    console.log("isNull",isNull)

    this.invalidInputDirective.check(this.formControls);

    if ((this.UpdatedStream != this.EditQuiz.topic.subject.stream.streamName || this.UpdatedSubject != this.EditQuiz.topic.subject.subjectName && this.UpdatedTopic != this.EditQuiz.topic.topicName && this.UpdatedPassCriteria != this.EditQuiz.passCriteria)&& !this.nullCheck()) {
      

      let UpdateQuizDetails: quiz = {
        id: this.EditQuiz.id,
        topic: this.FilteredtopicList.find(x => x.id = this.UpdatedTopicId),
        quizName: this.UpdatedQuizName,
        passCriteria: this.UpdatedPassCriteria,
        TotalNoOfQuestion: this.UpdatedTotalNoOfQuestion,
        creator: 121,
        modifier: this.UpdatedModifier,
        allowRetake: true
      }
    
      if (this.quizUpdate) {

        this.quizService.updateQuiz(UpdateQuizDetails).subscribe(data => {

          this.dialog.open(SuccessDialogComponent, { data: { message: "Successfully updated" } }).afterClosed().subscribe(data => {
            this.router.navigate(['home/quizes/quiz/']);
          });
        });

      }
      
    }
    else {
      this.quizBtn = true;
      this.snackBar.open("No changes", '', {
          duration: 3000
        })
    }

  }
  async ngOnDestroy(){
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }

  getPreviousValue(){
    this.passDataToUpdateBody();
    this.getQuizDataFromDataService();

  }

  cancelDetails() {
    const dialogRef = this.dialog.open(ClearFormDialogComponent)
      .afterClosed().subscribe(data => {
        if (data.shouldClearForm) {
          this.getPreviousValue();
        }
      });
  }

}
