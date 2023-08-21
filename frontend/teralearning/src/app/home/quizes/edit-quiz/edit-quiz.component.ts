import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StreamService } from 'src/app/service/stream.service';
import { SubjectService } from 'src/app/service/subject.service';
import { quiz } from 'src/model/quiz.model';
import { Stream } from 'src/model/stream.model';
import { Subject } from 'src/model/subject.model';
import { topic } from 'src/model/topic.model';
import { StreamEditComponent } from '../../streams/stream-edit/stream-edit.component';
import { QuizService } from 'src/app/service/quiz.service';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizDataTransferService } from 'src/app/service/quiz-data-transfer.service';
import { TopicService } from 'src/app/service/topic.service';

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
  FilteredsubjectList: Subject[] = [];
  FilteredtopicList: topic[] = [];
  EditQuiz!: quiz

  
  constructor(private dialog: MatDialog, private router: Router, private streamService: StreamService, private subjectService: SubjectService, private snackBar: MatSnackBar, private quizService: QuizService, private route: ActivatedRoute, private quizDataTransfer: QuizDataTransferService, private topicService: TopicService) {
  }
  UpdatedStream!: string;
  UpdatedSubject!: string;
  UpdatedTopic: topic = {
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


  ngOnInit(): void {
    console.log("firstttt",this.quizBtn)
    this.quizDataTransfer.data$.subscribe(receivedData => {
      if (receivedData) {
        console.log("receivedData", receivedData);
        this.EditQuiz = receivedData;
        this.UpdatedStreamId = this.EditQuiz?.topic.subject.stream.id;
        this.UpdatedSubjectId = this.EditQuiz?.topic?.subject?.id
        this.UpdatedTopicId = this.EditQuiz.topic?.id;
      }
    });
    if (!this.quizUpdate) {
      this.quizBtn = true
    }
    else{
      this.UpdateQuizDetails();
    }
    

   
    this.UpdatedQuizName = this.EditQuiz?.quizName;
    this.UpdatedPassCriteria = this.EditQuiz?.passCriteria;
    this.UpdatedTotalNoOfQuestion = this.EditQuiz?.TotalNoOfQuestion;
    this.UpdatedModifier = this.EditQuiz?.modifier;
    this.UpdatedAllowRetake = this.EditQuiz?.allowRetake;
    this.getStreams();
    this.getSubjectList();
    this.getTopicList();
    console.log("QuizBody", this.UpdatedTopic)
   
  }

  getStreams() {
    this.streamService.getStreamList().subscribe(data => {
      this.streamList = data
      console.log(this.streamList)
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
      console.log("Filteredsubjectlist", this.FilteredsubjectList)

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
      this.FilteredtopicList = data.body;
      console.log("topiclist", this.FilteredtopicList)
    })

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

  UpdateQuizDetails() {
    console.log("jhadgfjhdgf")


    if (this.quizUpdate && this.UpdatedStream != '' && this.UpdatedSubject != '' && this.UpdatedTopic != undefined && this.UpdatedPassCriteria != 0) {

      console.log("calling UpdateQuizDetails")
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
      console.log("UpdateQuizDetails", UpdateQuizDetails, this.quizUpdate)
      if (this.quizUpdate) {

        this.quizService.updateQuiz(UpdateQuizDetails).subscribe(data => {
          console.log("sgrgregerh", this.quizUpdate);

          this.dialog.open(SuccessDialogComponent, { data: { message: "Successfully updated" } }).afterClosed().subscribe(data => {
            this.router.navigate(['home/quizes/quiz/']);
          })


        });

      }
      else {
        this.snackBar.open("No changes", '', {
          duration: 3000
        })

      }

    }
    else {
      this.quizBtn = true;
      this.snackBar.open("Invalid Entry", '', {
        duration: 3000
      })
    }

  }

}
