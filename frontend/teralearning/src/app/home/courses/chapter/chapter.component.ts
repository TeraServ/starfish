import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  constructor(private matDialog: MatDialog, private componentFactoryResolver: ComponentFactoryResolver, private courseService: CourseService, private chapterDataService: ChapterDataService) { }

  // pageData:Page[]=[];
  chapterData:Chapter =new Chapter;
  @Output() dataChangeEvent = new EventEmitter();
  //chapters:CHBody[]=[];
  @Input() data!: Chapter[];

  @ViewChild("chapterName") chapterName!: ElementRef;
  dataChanged: boolean = false;
  expandedIndex = 0;
  @Output() saveChapterEvent = new EventEmitter();
  ngOnInit(): void {
    this.chapterData = this.data[0]
    console.log(this.data)
    //this.getChapters();
  }


  getChapters(){
    this.chapterDataService.getChapterData(this.chapterData.id).subscribe(data=>{
      if(data){
        this.chapterData.bodies.push(data);
      }
      console.log(data);
    })
  }
  chapterNameChanged(index:any,event:any){
    this.data[index].chapterName = event.target.value;
    this.changed();
    this.saveChapter(index);
  }
  changeSaved(){
    this.dataChangeEvent.emit(false);
  }
  addPage(index:any){
    this.changed()
    //this.chapterData.title = "Chapter 1"
    this.matDialog.open(PageComponent,{height:"90%"}).afterClosed().subscribe(data=>{
      if(data.data != undefined){
       
        let chbody:CHBody ={
          id:0,
          type:"page",
          pages:data.data,
          quizList:null
        } 
        this.data[index].bodies.push(chbody);
        // this.pageData.push(data.data); 
        // this.chapterDataService.addChapterPageAndQuiz(body).subscribe(data=>{
        //   this.chapterData.body.push(data)
        // }) 
        // this.chapterData.body.push(chbody)

        this.dataChanged = true;
       this.saveChapter(index);
      }else{
        this.changeSaved()
      }
    });

  }

  changed() {
    this.dataChangeEvent.emit({isSaving:true,data:this.data});
  }
  addQuiz(index:any) {
    this.changed()
    this.matDialog.open(ChapterQuizComponent, { height: "90%", width: "100%" }).afterClosed().subscribe(value => {
      if (value.event == "Add") {
        console.log(value.chosenQuiz)
        let addedQuiz: CHBody = {
          id: 0,
          type: "quiz",
          pages: null,
          quizList: value.chosenQuiz,
        }
        this.data[index].bodies.push(addedQuiz);
        console.log("addedQuiz", addedQuiz)
        this.dataChanged = true;
        this.saveChapter(index);
      } else if (value.event == "Cancel") {
        this.changeSaved()
      } else {
        console.log(value)
        this.changeSaved()
      }

    })
   
  }
  saveChapter(index:any) {
    
    if (this.data[index].chapterName != null) {
      this.courseService.saveChapterByCourseId(this.data[index]).subscribe(data => {
        if (data) {
          this.data[index] = data;;
          this.dataChanged = false;
          this.changeSaved()
          this.matDialog.open(SuccessDialogComponent, { data: { message: "Successfully Saved!" } })
        }
      })
    } else {

    }
    this.changeSaved();

  }

  drop(event: CdkDragDrop<string[]>,index:any) {
    this.changed()
    moveItemInArray(this.data[index].bodies, event.previousIndex, event.currentIndex);
    this.saveChapter(index);
    this.dataChanged = true;
  }
  removeChapter(index:any) { 
    this.courseService.deleteChapterById(this.data[index].id).subscribe(data=>{
      console.log(data);
      this.data.splice(index,1);
    },(err)=>{
      if(err.status ==200){
        this.data.splice(index,1);
      }
      console.log(err)
    })
   
    
    
  }
  removePage(chapterIndex:any,index: number) {
    this.changed()
    this.data[chapterIndex].bodies.splice(index,1);
    // this.chapterData.pages = this.pageData;
    this.dataChanged = true;
    this.saveChapter(chapterIndex)
  }

  editPage(chapterIndex:any,pageIndex:any,data:any){
    this.changed()
    this.matDialog.open(PageComponent,{data:data,height:"90%"}).afterClosed().subscribe(data=>{
         console.log(data);
         this.data[chapterIndex].bodies[pageIndex] = data;
         this.saveChapter(chapterIndex)
    })
  }

}
