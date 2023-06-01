import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Stream } from '../models/stream.model';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {

  public pageSize = 5;

  constructor(public dialog:MatDialog) { }
  displayedColumns: string[] = ['No','streamName' ,'Acronymn' , 'price', 'discounts'];
  @Input() dataSource = new MatTableDataSource<Stream>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('streamName') streamName!:ElementRef;
  @ViewChild('Acronymn') Acronymn!:ElementRef;
  @ViewChild('price') price!:ElementRef;
  @ViewChild('discounts') discounts!:ElementRef;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.paginator.page.subscribe(
  //     (event) => console.log(event)
  //   )
  // }


  ngOnInit(): void {
  }
  public handlePage(e:PageEvent):PageEvent{
    this.pageSize = e.pageSize;
    return e;
   
  }
;
}
