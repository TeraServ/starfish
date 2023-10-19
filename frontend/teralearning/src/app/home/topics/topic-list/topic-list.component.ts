import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Topic } from 'src/model/topic.model';
import { TopicService } from '../../../service/topic.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TopicEditComponent } from '../topic-edit/topic-edit.component';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialogBoxs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  public pageSize = 5;
  topicList: Topic[] = [];

  constructor(public dialog: MatDialog, private topicService: TopicService, public dialogRef: MatDialog) { }
  displayedColumns: string[] = ['streamName', 'subjectName', 'topicName', 'actions'];
  @Input() dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics() {
    this.topicService.getSTopicList().subscribe(data => {
      this.dataSource.data = data;
      console.log(this.dataSource.data)

    })
  }

  topicEditClick(topic: Topic) {
    console.log(topic)
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
      data: {id:topic.id, message: "Are you sure want to delete", funId: 3},
    }).afterClosed().subscribe(data => {
      this.getTopics();
    })
    

  }

}


