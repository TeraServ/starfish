import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InvalidFieldFocusDirective } from 'src/app/custom-directives/invalidfieldfocus.directive';
import { ClearFormDialogComponent } from 'src/app/dialogBoxs/clear-form-dialog/clear-form-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { AuthService } from 'src/app/service/auth.service';
import { QuizService } from 'src/app/service/quiz.service';
import { StreamService } from 'src/app/service/stream.service';
import { SubjectService } from 'src/app/service/subject.service';
import { TopicService } from 'src/app/service/topic.service';
import { quiz } from 'src/model/quiz.model';
import { Stream } from 'src/model/stream.model';
import { Subject } from 'src/model/subject.model';
import { Topic } from 'src/model/topic.model';


@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {


  createQuizForm!: FormGroup;
  streamList: Stream[] = [];
  subjectList: Subject[] = [];
  FilteredsubjectList: Subject[] = [];
  FilteredtopicList: Topic[] = [];
  topicList: Topic[] = [];
  submitted: boolean = false;
  id!: number;
  stream!: Stream;
  subject: Subject = new Subject();
  quiz: quiz = new quiz();
  topic!: Topic;
  quizName!: string;
  defaultChecker: boolean = true;
  @ViewChild(InvalidFieldFocusDirective)
  invalidInputDirective!: InvalidFieldFocusDirective;
  @ViewChildren(NgControl) formControls!: QueryList<NgControl>;


  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private streamService: StreamService, private subjectService: SubjectService, private topicService: TopicService, private quizService: QuizService, private router: Router,private authService: AuthService, public dialogRef: MatDialogRef<AddQuizComponent>) { }

  ngOnInit(): void {
    
    this.BuildForm();
    this.getStreamList();  
    

  }
  BuildForm(){
    this.createQuizForm = this.formBuilder.group({
      subject: ['', [Validators.required]],
      stream: ['', [Validators.required]],
      topic: ['', [Validators.required]],
      quizName: ['', [Validators.required]],
      passCriteria: ['', [Validators.required]],
      allowRetake: [true]

    });
  }

  checkerChange(event: any) {
    this.defaultChecker = event.target.checked;
  }


  getStreamList() {
    this.streamService.getStreamList().subscribe((data: Stream[]) => {
      this.streamList = data;
      console.log("streamlist", this.streamList);
    })
  }

  getSubjectList() {
    console.log(this.createQuizForm.get('stream')?.value.id)
    this.subjectService.getFilteredSubject(this.createQuizForm.get('stream')?.value.id).subscribe((data) => {
      console.log("subjectList",data.body)
      this.FilteredsubjectList = data.body;
      console.log("Filteredsubjectlist", this.FilteredsubjectList)
    
    })
  }
  getTopicList() {
    this.topicService.getFilteredTopic(this.createQuizForm.get('subject')?.value.id).subscribe((data) => {
      this.FilteredtopicList = data;
      console.log("topiclist", this.FilteredtopicList)
    })

  }


  // updatedSubjectList() {
  //   this.FilteredsubjectList.length = 0;
  //   this.FilteredtopicList.length = 0;

  //   this.subjectList.forEach((subject) => {
  //     if (subject.stream.id == this.createQuizForm.get('stream')?.value.id) {
  //       this.FilteredsubjectList.push(subject)
  //     }
  //   });
  // }

  // updatedTopicList(){
  //   console.log(this.createQuizForm.get('subject')?.value)
  //   this.FilteredtopicList.length = 0;
  //   this.topicList.forEach((element)=>{
  //     if(element.subject.id == this.createQuizForm.get('subject')?.value.id){
  //       this.FilteredtopicList.push(element);
  //     }
  //   })
  //   console.log("filter topic",this.FilteredtopicList)

  // }
 

  
  //creating quiz
  createQuiz(newQuiz: quiz) {

    this.quizService.createQuiz(newQuiz).subscribe(data => {     

      this.dialog.open(SuccessDialogComponent, { data: { header:'Successfully Created',message: `${newQuiz.quizName} was created under topic ${newQuiz.topic.topicName}.` }
       }).afterClosed().subscribe(data => {
        this.dialogRef.close();
      })

    });
    
    
    console.log("createQuiz", this.quiz)

  }

  onSubmit() {
    console.log("checker", this.defaultChecker)
    this.submitted = true;
    this.invalidInputDirective.check(this.formControls);
    if (this.createQuizForm.valid) {
      let newQuiz: quiz = {
        id: 0,
        topic: this.createQuizForm.get('topic')?.value,
        quizName: this.createQuizForm.get('quizName')?.value,
        passCriteria: this.createQuizForm.get('passCriteria')?.value,
        creator: this.authService.getUserId(),
        modifier: this.authService.getUserId(),
        allowRetake: this.createQuizForm.get('allowRetake')?.value
      }
      console.log(newQuiz)
      this.createQuiz(newQuiz)
      this.dialogRef.close();
    }


    else {

    }

    this.createQuizForm.clearValidators();
    //this.submitted = false;



  }

  clearValidations(): void {
    this.createQuizForm.reset();
    Object.keys(this.createQuizForm.controls).forEach(key => {
      this.createQuizForm.get(key)?.markAsUntouched();
      this.createQuizForm.get(key)?.markAsPristine();
    })
    this.submitted = false;
    this.BuildForm();
  }

  cancelDetails() {
    const dialogRef = this.dialog.open(ClearFormDialogComponent)
      .afterClosed().subscribe(data => {
        if (data.shouldClearForm) {
          this.clearValidations();
        }
      });
  }
}
