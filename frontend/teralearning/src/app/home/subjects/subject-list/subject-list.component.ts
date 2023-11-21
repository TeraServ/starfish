import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { SubjectEditComponent } from '../subject-edit/subject-edit.component';

import { SubjectService } from 'src/app/service/subject.service';
import { Subject } from 'src/model/subject.model';
import { Observable } from 'rxjs';
import { StreamService } from 'src/app/service/stream.service';
import { Stream } from 'src/model/stream.model';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {

  public pageSize = 5;
  subjects!: Subject[];
  streams!: any[];
  filterSelectObj: any[] = [];
  filterValues: any[] = [];




  constructor(public dialog: MatDialog, private subjectService: SubjectService, public dialogRef: MatDialog, private streamService: StreamService) {
    this.filterSelectObj = [
      {
        name: 'Stream',
        columnProp: 'stream',
        options: ['All']
      },

    ];
  }

  displayedColumns: string[] = ['streamName', 'subjectName', 'actions'];
  @Input() dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getSubjects();
    this.getStreams();
    const deptData = this.subjectService.getSubject();


    this.dataSource.filterPredicate = this.createFilter();

    // this.filterSelectObj.filter((o: any) => {
    //   o.options = this.getFilterObject(deptData, o.columnProp);
    // });
  }
  public handlePage(e: PageEvent): PageEvent {
    this.pageSize = e.pageSize;
    return e;

  }
  getSubjects() {
    this.subjectService.getSubject().subscribe(data => {
      this.subjects = data;
      this.dataSource.data = data;
      console.log(this.dataSource.data)
      console.log("sorted", this.getSortedSubjects())
    })

  }
  getStreams() {
    this.streamService.getStreamList().subscribe(data => {
      this.streams = data;
      this.filterSelectObj[0].options = data.map(stream => {
        return {
          id: stream.id,
          name: stream.streamName
        };
      });
    })
  }

  //sorting subjects
  getSortedSubjects(): Subject[] {
    if (this.subjects) {
      return this.subjects.sort((a, b) => a.stream.streamName.localeCompare(b.stream.streamName))
    }
    return [];

  }

  //common search with alphabets

  filterTable(input: string | any) {
    console.log(input.target.value)
    this.dataSource.filterPredicate = (data: Subject, f: string) =>
      !f ||
      data.subjectName.toLowerCase().includes(f) ||
      data.subjectName.toLowerCase().includes(f.toLowerCase());

    input = input.target.value?.trim(); // Remove whitespace
    input = input?.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = input;
  }

  getFilterObject(fullObj: any, key: string | number) {
    const uniqChk: any[] = [];
    fullObj.filter((obj: { [x: string]: any; }) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  filterChange(filter: any, event: any) {
   // console.log("fjffjfh", filter, this.dataSource.data);
    if (filter.columnProp == "stream") {
      this.dataSource.data = this.subjects.filter(item => item.stream.id.toString() === filter.modelValue || filter.modelValue === '');
      console.log("if", this.dataSource.data);
    }

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
