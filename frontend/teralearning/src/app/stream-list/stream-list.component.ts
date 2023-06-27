import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Stream } from 'src/model/stream.model';
import { StreamEditComponent } from '../home/stream-edit/stream-edit.component';
import { StreamService } from '../service/stream.service';


@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {

  public pageSize = 5;
  streamList: Stream[] = [];

  constructor(public dialog:MatDialog,private streamService: StreamService,public dialogRef: MatDialog) { }
  displayedColumns: string[] = ['streamName' ,'acronym' , 'price', 'actions'];
  @Input() dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
    this.getStreams();
    //this.dataSource.data = [{"id":"1","streamName":"CSE","Acronymn":"CS","price":"100","discounts":"10"}]
  }
  public handlePage(e:PageEvent):PageEvent{
    this.pageSize = e.pageSize;
    return e;
   
  }

  getStreams(){
    this.streamService.getStreamList().subscribe(data => {
    this.dataSource.data = data;      
      console.log(this.dataSource.data)
    })
  }

  streamEditClick(stream:Stream){
    console.log(stream)
    this.dialogRef.open(StreamEditComponent,{
      width: '40%',
      height: '70%',
      data: stream
    }).afterClosed().subscribe(result => {
      this.getStreams();
    })

  }
}
