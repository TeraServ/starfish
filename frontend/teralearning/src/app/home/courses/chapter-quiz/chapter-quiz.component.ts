import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { QuizService } from 'src/app/service/quiz.service';
import { StreamService } from 'src/app/service/stream.service';
import { SubjectService } from 'src/app/service/subject.service';
import { TopicService } from 'src/app/service/topic.service';
import { quiz } from 'src/model/quiz.model';
import { Topic } from 'src/model/topic.model';

@Component({
  selector: 'app-chapter-quiz',
  templateUrl: './chapter-quiz.component.html',
  styleUrls: ['./chapter-quiz.component.scss']
})
export class ChapterQuizComponent implements OnInit {

  quizList: quiz[] = [];
  streamFilterList: any[] = [];
  subjectFilterList: any[] = [];
  topicFilterList: any[] = [];
  showPaginator: boolean = false;

  searchForm!: FormGroup;
  topicList: Topic[] = [];


  searchQuizByName: quiz[] = [];

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder,
    private _dialog: MatDialog,
    public dialogRef: MatDialogRef<ChapterQuizComponent>,
    private quizService: QuizService, private streamService: StreamService, private subjectService: SubjectService, private topicService: TopicService) { }

  displayedColumns: string[] = ['QuizName', 'Stream', 'Subject', 'Topic', 'Actions']
  dataSource = new MatTableDataSource<quiz>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() choosenQuiz!: quiz


  ngOnInit(): void {
    this.buildForm();
    this.getQuiz();

  }
  buildForm() {
    this.searchForm = this.formBuilder.group({
      stream: ['All'],
      subject: ['All'],
      topic: ['All'],
      search: ['']
    });
  }



  searchByQuizName() {
    let searchText = this.searchForm.get('search')?.value;
    if (searchText != "") {
      this.quizService.getQuizList().subscribe(qlist => {
        this.dataSource.data = qlist;
        this.quizList = this.searchByText(qlist, searchText);
      })
      this.dataSource.filter = searchText;
      this.dataSource._updateChangeSubscription();
    } else {
      this.getQuiz();
      this.dataSource._updateChangeSubscription();
    }

  }

  searchByText(array: quiz[], searchText: string): quiz[] {
    let searchFound: quiz[] = [];
    for (const item of array) {
      if (item.quizName.includes(searchText)) {
        searchFound.push(item);
      }
    }
    return searchFound;
  }

  togglePaginator() {
    this.showPaginator = !this.showPaginator;
  }

  AddQuizToChapter(element: any) {
    this.choosenQuiz = element;
    console.log("Chosen Quiz:", element.value);
    this.showSuccessDialogBox();
  }
  showSuccessDialogBox() {
    this._dialog.open(SuccessDialogComponent, { data: { message: "Successfully Added to Course" } })
      .afterClosed().subscribe(val => {
        this.dialogRef.close({ event: "Add", chosenQuiz: this.choosenQuiz });
      })
  }

  closeDialogBox() {
    this.dialogRef.close({ event: "Cancel", chosenQuiz: null });
  }

  getQuiz() {
    this.quizService.getQuizList().subscribe(data => {
      this.dataSource.data = data;
      console.log("hsgdjhsgd", this.dataSource.data)

      if (this.dataSource.data?.length >= 5) {
        this.dataSource.paginator = this.paginator;
        this.showPaginator = true

      }


      this.dataSource.data.forEach(element => {
        if (!this.streamFilterList.includes(element.topic?.subject?.stream?.streamName)) {
          this.streamFilterList.push(element.topic?.subject?.stream?.streamName);
        }
        console.log("streamlistfiltered", element.topic?.subject?.stream?.streamName)
      });

      this.dataSource.data.forEach(element => {
        if (!this.subjectFilterList.includes(element.topic?.subject?.subjectName)) {
          this.subjectFilterList.push(element.topic?.subject?.subjectName);
        }
        console.log("subjectlistfiltered", element.topic?.subject?.subjectName)
      });

      this.dataSource.data.forEach(element => {
        if (!this.topicFilterList.includes(element.topic.topicName)) {
          this.topicFilterList.push(element.topic.topicName);
        }
        console.log("topiclistfiltered", element.topic.topicName)

      });

      this.quizList = data;
      console.log("quizdata", this.quizList)
      if (this.dataSource.data?.length >= 5) {
        this.dataSource.paginator = this.paginator;
        this.showPaginator = true;
      }
    })
  }

  //search for Streams
  filterStreamTable(input: string | any) {
    console.log(input.target.value)
    this.dataSource.filterPredicate = (data: quiz, f: string) =>
      !f ||
      data.topic.subject.stream.streamName == input.target.value;
    this.dataSource.filter = input.target.value;
  }
  //search for subjects
  filterSubjectTable(input: string | any) {
    console.log(input.target.value)
    this.dataSource.filterPredicate = (data: quiz, f: string) =>
      !f ||
      data.topic.subject.subjectName == input.target.value;
    this.dataSource.filter = input.target.value;
  }

  //search for topics
  filterTopicTable(input: string | any) {
    console.log(input.target.value)
    this.dataSource.filterPredicate = (data: quiz, f: string) =>
      !f ||
      data.topic.topicName == input.target.value;
    this.dataSource.filter = input.target.value;
  }


}


