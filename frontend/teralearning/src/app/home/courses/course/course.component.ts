import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewCourseComponent } from '../new-course/new-course.component';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from 'src/app/service/file.service';
import { CourseService } from 'src/app/service/course.service';
import { Course } from 'src/model/course.model';
import { Observable, takeLast } from 'rxjs';
import { CourseDataService } from 'src/app/service/course-data.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  fakeArray = Array(10);
  image!:Blob
  imageURL!:SafeUrl
  imageList: Map<string, SafeUrl> = new Map<string, SafeUrl>();
  courseList:Course[]=[]
  constructor(private courseDataService:CourseDataService,private matDialog:MatDialog,private route:Router,private imageService:FileService,private sanitizer: DomSanitizer,private courseService:CourseService) { }

  ngOnInit(): void {
   
   this.getAllCourse();
   //this.getCoverImage("2140f8a3-da7c-46cd-a132-0d80f1d098fc")
    
  }

  getCoverImage(course:Course){
    //console.log(this.imageService.getImageById(index))

    this.imageService.getImageById(course.coverUrl).subscribe(data=>{
  
      this.image = data;
      this.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image));
      this.imageList.set(course.coverUrl,this.imageURL)
      
    }) 
    

  
    
  }
  shareData(data:any){
    this.courseDataService.shareData(data);
  }
  getImage(id:string){
    return this.imageList.get(id);
  }
  getAllCourse(){
    this.courseService.getAllCourse().subscribe(data=>{
      this.courseList = data;

       this.courseList.forEach(element => {
        this.getCoverImage(element)
      });
    })
  }

  openDialog(){
    this.matDialog.open(NewCourseComponent,{data:""}).afterClosed().subscribe(data=>{
      this.getAllCourse();
    });
   
  }
  editCourseDialog(courseData:any){
    this.matDialog.open(NewCourseComponent,{data:courseData}).afterClosed().subscribe(data=>{
      this.getAllCourse();
    });
   
  }



  

}
