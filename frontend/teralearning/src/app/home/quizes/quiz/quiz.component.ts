import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddQuizComponent } from '../add-quiz/add-quiz.component';
import { DeleteDialogComponent } from 'src/app/dialogBoxs/delete-dialog/delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { quiz } from 'src/model/quiz.model';
import { QuizService } from 'src/app/service/quiz.service';
import { ThisReceiver } from '@angular/compiler';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { QuizDataTransferService } from 'src/app/service/quiz-data-transfer.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {

  quizList: quiz[] = [];
  streamFilterList: any[] = [];
  subjectFilterList: any[] = [];
  topicFilterList: any[] = [];


  showPaginator: boolean = false;
  constructor(private dialog: MatDialog, private quizService: QuizService, private authService: AuthService, private router: Router, private quizDataTransfer: QuizDataTransferService) {

  }

  displayedColumns: string[] = ['QuizName', 'Stream', 'Subject', 'Topic', 'Actions']

  dataSource = new MatTableDataSource<quiz>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.getQuiz();
  }

  openAddDialog() {
    this.dialog.open(AddQuizComponent, {
      width: "800px",
      height: "450px"

    }).afterClosed().subscribe(data => {
      this.getQuiz()
    })
  }

  // navigateEditQuiz() {
  //   const data = { key: 'dataSource.data' };
  //   this.router.navigate(['home/quizes/quiz/edit'], { queryParams: { 'datasource.data': data } });
  // }



  getQuiz() {
    this.quizService.getQuizList().subscribe(data => {
      this.dataSource.data = data;



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

  passDataToService(quiz: any) {
    //this.router.navigate(['/edit/quizName',quiz.quizName]);
    this.quizDataTransfer.passData(quiz);
  }
  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: id, message: "Are you sure want to delete ", funId: 1, warnMessage: "Cannot Delete Quiz as it is mapped to a course" },
    }).afterClosed().subscribe(data => {
      this.getQuiz();
    });

  }

  togglePaginator() {
    this.showPaginator = !this.showPaginator;
  }


  getResult(v: any) {
    console.log(v.target.checked)
    console.log("userId", this.authService.getUserId())
    if (v.target.checked && this.authService.getUserId() == 121) {
      this.dataSource.data = this.dataSource.data.filter(item => item.creator == 121);
    } else {
      this.dataSource.data = this.quizList;
    }
    console.log("getResult", this.dataSource.data)

  }
  //search for phonenumber

  filterQuizName(input: string | any) {
    console.log(input.target.value)
    this.dataSource.filterPredicate = (data: quiz, f: string) =>
      !f ||
      data.quizName.toLowerCase().includes(f) ||
      data.quizName.toLowerCase().includes(f.toLowerCase());

    input = input.target.value?.trim(); // Remove whitespace
    input = input?.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = input;
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
  trackByFnForStream(index: number, item: any) {
    return item;
  }



  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col]
              .trim()
              .toLowerCase()
              .split(' ')
              .forEach((word: any) => {
                if (
                  data[col]
                    .toString()
                    .toLowerCase()
                    .indexOf(word) != -1 &&
                  isFilterSet
                ) {
                  found = true;
                }
              });
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }
}
