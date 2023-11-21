import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Topic } from 'src/model/topic.model';
import { TopicService } from '../../../service/topic.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TopicEditComponent } from '../topic-edit/topic-edit.component';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialogBoxs/delete-dialog/delete-dialog.component';

import { Stream } from 'src/model/stream.model';
import { Subject } from 'src/model/subject.model';
import { StreamService } from 'src/app/service/stream.service';
import { SubjectService } from 'src/app/service/subject.service';

export const pageSize = 5;
@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  topicList: Topic[] = [];
  streamFilterList: any[] = [];
  subjectFilterList: any[] = [];
  isDataAvailable:boolean=false;
  showPaginator: boolean = false;

  constructor(public dialog: MatDialog, private topicService: TopicService,public dialogRef: MatDialog) { }
  displayedColumns: string[] = ['streamName', 'subjectName', 'topicName', 'edit','delete'];
  @Input() dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }

  ngOnInit(): void {
    this.getTopics();
    //this.dataSource.filterPredicate = this.createFilter();
    console.log("data length",this.dataSource.data.length)
    
  }

 
  getTopics() {
    this.topicService.getSTopicList().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.data.forEach(element=>{
        if (!this.streamFilterList.includes(element.subject?.stream?.streamName)) {
          this.streamFilterList.push(element.subject?.stream?.streamName);
        }
      });
      this.dataSource.data.forEach(element => {
        if (!this.subjectFilterList.includes(element.subject?.subjectName)) {
          this.subjectFilterList.push(element.subject?.subjectName);
        }
        console.log("subjectlistfiltered", element.subject?.subjectName)
      });
      this.checkPaginatorSize();

    })
  }

  checkPaginatorSize(){
    if (this.dataSource.data?.length > pageSize) {
      this.dataSource.paginator = this.paginator;
      this.showPaginator=true      
    }
  }

  togglePaginator() {
    this.showPaginator = !this.showPaginator;
  }
  topicEditClick(topic: Topic) {
    this.dialogRef.open(TopicEditComponent, {
      width: '40%',
      height: '70%',
      data: topic
    }).afterClosed().subscribe(result => {
      this.getTopics();
    })
  }

  onDeleteTopic(topic:Topic){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id:topic.id, message: "Are you sure want to delete "+topic.topicName+"?", funId: 3,deleteItem:topic},
    }).afterClosed().subscribe(data => {
      this.getTopics();
    })
    

  }

  //search for Streams
  filterStreamTable(input: string | any) {
    //console.log(input.target.value)
    this.dataSource.filterPredicate = (data: Topic, f: string) =>
      !f ||
      data.subject.stream.streamName == input.target.value;
    this.dataSource.filter = input.target.value;
    this.showPaginatorAfterFilter();
    
  }

   //search for subjects
   filterSubjectTable(input: string | any) {
    //console.log(input.target.value)
    this.dataSource.filterPredicate = (data: Topic, f: string) =>
      !f ||
      data.subject.subjectName == input.target.value;
    this.dataSource.filter = input.target.value;
    this.showPaginatorAfterFilter();
    
  }

  //search for Topic
  filterTopicName(input: string | any) {
    console.log(input.target.value)
    this.dataSource.filterPredicate = (data: Topic, f: string) =>
      !f ||
      data.topicName.toLowerCase().includes(f) ||
      data.topicName.toLowerCase().includes(f.toLowerCase());

    input = input.target.value?.trim(); // Remove whitespace
    input = input?.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = input;
    this.showPaginatorAfterFilter();
  }

  showPaginatorAfterFilter(){
    //console.log(this.dataSource.filteredData)
    if (this.dataSource.filteredData.length < pageSize) {
      this.dataSource.paginator = this.paginator;
      this.showPaginator = false      
    }else{
      this.showPaginator=true;      
    }
  }

}