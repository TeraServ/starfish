import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageComponent } from '../page/page.component';
import { Chapter } from 'src/model/chapter.model';
import { Page } from 'src/model/page.model';
import { NgFor } from '@angular/common';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { Course } from 'src/model/course.model';
import { CourseService } from 'src/app/service/course.service';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { CHBody } from 'src/model/chbody.model';
import { ChapterDataService } from 'src/app/service/chapter-data.service';
import { ChapterQuizComponent } from '../chapter-quiz/chapter-quiz.component';
@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],

})
export class ChapterComponent implements OnInit {

  constructor(private matDialog:MatDialog,private componentFactoryResolver: ComponentFactoryResolver,private courseService:CourseService,private chapterDataService:ChapterDataService) { }

  // pageData:Page[]=[];
  chapterData:Chapter =new Chapter;
  //chapters:CHBody[]=[];
  @Input() data!: Chapter[];

  @ViewChild("chapterName") chapterName!: ElementRef;
  dataChanged: boolean = false;
  ngOnInit(): void {
    this.chapterData = this.data[0]
    this.getChapters();
  }
  getChapters(){
    this.chapterDataService.getChapterData(this.chapterData.id).subscribe(data=>{
      if(data){
        this.chapterData.bodies.push(data);
      }
      console.log(data);
    })
  }
  addPage(){
    //this.chapterData.title = "Chapter 1"
    this.matDialog.open(PageComponent,{height:"90%"}).afterClosed().subscribe(data=>{
      if(data.data != undefined){
       
        let chbody:CHBody ={
          id:0,
          type:"page",
          pages:data.data,
          quizList:{}
        } 
        this.chapterData.bodies.push(chbody);
        // this.pageData.push(data.data); 
        // this.chapterDataService.addChapterPageAndQuiz(body).subscribe(data=>{
        //   this.chapterData.body.push(data)
        // }) 
       // this.chapterData.body.push(chbody)
        
        this.dataChanged = true;
      }
    });

  }

  changed(){
    this.dataChanged = true;
  }
  addQuiz() {
    this.matDialog.open(ChapterQuizComponent, { height: "90%", width: "100%" }).afterClosed().subscribe(value => {
      if (value.event == "Add") {
        console.log(value.chosenQuiz)
      } else if (value.event == "Cancel") {

      } else {
        console.log(value)
      }

    })
  }
  saveChapter() {

    this.chapterData.chapterName = this.chapterName.nativeElement.value;
    if (this.chapterData.chapterName != null) {
      this.courseService.saveChapterByCourseId(this.chapterData).subscribe(data => {
        if (data) {
          this.chapterData = data;
          this.dataChanged = false;
          this.matDialog.open(SuccessDialogComponent, { data: { message: "Successfully Saved!" } })
        }
      })
    } else {

    }

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapterData.bodies, event.previousIndex, event.currentIndex);
   
    this.dataChanged = true;
  }
  removeChapter() { }
  removePage(index: number) {
    console.log("delete");
    this.chapterData.bodies.splice(index,1);
    // this.chapterData.pages = this.pageData;
    this.dataChanged = true;
  }

  editPage(data:Page){
    
    this.matDialog.open(PageComponent,{data:data,height:"90%"}).afterClosed().subscribe(data=>{
      
    })
  }

}
