import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageComponent } from '../page/page.component';
import { Chapter } from 'src/model/chapter.model';
import { Page } from 'src/model/page.model';
import { NgFor } from '@angular/common';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { Course } from 'src/model/course.model';
import { CourseService } from 'src/app/service/course.service';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],

})
export class ChapterComponent implements OnInit {

  constructor(private matDialog:MatDialog,private componentFactoryResolver: ComponentFactoryResolver,private courseService:CourseService) { }

  // pageData:Page[]=[];
  chapterData:Chapter =new Chapter;
  
  @Input() data!: Chapter[];

  @ViewChild("chapterName") chapterName!:ElementRef; 
  dataChanged:boolean = false;
  ngOnInit(): void {
    
    this.chapterData = this.data[0]
  
   
    
    
  }
 
  addPage(){
    //this.chapterData.title = "Chapter 1"
    this.matDialog.open(PageComponent,{height:"90%"}).afterClosed().subscribe(data=>{
      if(data.data != undefined){
       
        // this.pageData.push(data.data);  
        this.chapterData.pages.push(data.data)
        this.dataChanged = true;
      }
    });
   
  }
  changed(){
    this.dataChanged = true;
  }
  saveChapter(){
    
    this.chapterData.chapterName =  this.chapterName.nativeElement.value;
    if(this.chapterData.chapterName != null){
      this.courseService.saveChapterByCourseId(this.chapterData).subscribe(data=>{
       if(data){
        this.chapterData = data;
        this.dataChanged = false;
        this.matDialog.open(SuccessDialogComponent,{data:{message:"Successfully Saved!"}})
       }
      })
    }else{

    }

  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapterData.pages, event.previousIndex, event.currentIndex);
   
    this.dataChanged = true;
  }
  removeChapter(){}
  removePage(index:number){
    console.log("delete");
    this.chapterData.pages.splice(index,1);
    // this.chapterData.pages = this.pageData;
    this.dataChanged = true;
  }

  editPage(data:Page){
    
    this.matDialog.open(PageComponent,{data:data,height:"90%"}).afterClosed().subscribe(data=>{

    })
  }

}
