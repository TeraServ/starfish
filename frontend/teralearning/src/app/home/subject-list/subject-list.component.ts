import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { SubjectEditComponent } from '../subject-edit/subject-edit.component';

import { SubjectService } from 'src/app/service/subject.service';
import { Subject } from 'src/model/subject.model';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {

  public pageSize = 5;

  constructor(public dialog: MatDialog, private subjectService: SubjectService, public dialogRef: MatDialog) { }

  displayedColumns: string[] = ['id', 'streamName', 'subjectName', 'actions'];
  @Input() dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getSubjects();
  }
  public handlePage(e: PageEvent): PageEvent {
    this.pageSize = e.pageSize;
    return e;

  }
  getSubjects() {
    this.subjectService.getSubject().subscribe(data => {
      this.dataSource.data = data;
      console.log(this.dataSource.data)
    })

  }
  subjectEditClick(subject: Subject) {
    console.log(subject)
    this.dialogRef.open(SubjectEditComponent, {
      width: '40%',
      height: '60%',
      data: subject
    }).afterClosed().subscribe(result => {
      this.getSubjects();
    })

  }

}
