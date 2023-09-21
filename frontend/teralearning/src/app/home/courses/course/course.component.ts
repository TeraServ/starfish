import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewCourseComponent } from '../new-course/new-course.component';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from 'src/app/service/file.service';
import { CourseService } from 'src/app/service/course.service';
import { Course } from 'src/model/course.model';
import { Observable, takeLast } from 'rxjs';
import { CourseDataService } from 'src/app/service/course-data.service';
import { StreamService } from 'src/app/service/stream.service';
import { Stream } from 'src/model/stream.model';
import { Subject } from 'src/model/subject.model';
import { Topic } from 'src/model/topic.model';
import { SubjectService } from 'src/app/service/subject.service';
import { TopicService } from 'src/app/service/topic.service';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  fakeArray = Array(10);
  image!:Blob;
  @ViewChild('streamFilter') streamSearch!:ElementRef;
  streamList:Stream[]=[];
  subjectList:Subject[]=[];
  topicList:Topic[]=[];
  filterSubject!:Subject;


  allCourses:Course[]=[];
  myCourse:Course[] = [];

  filterCourseByStream:Course[]= [];
  filterCourseBySubject:Course[]=[];
  filterCourseByTopic:Course[]=[];
  


  filterTopic!:Topic;
  searchCourseByName:Course[]=[]
  imageURL!:SafeUrl
  imageList: Map<string, SafeUrl> = new Map<string, SafeUrl>();
  courseList:Course[]=[]
  courses:Course[]=[];
  userId:any;
  searchForm!:FormGroup

  selectedStreamId!:number;
  selectedSubjectId!:number;
  selectedTopicId!:number;

  constructor(private formBuilder:FormBuilder,private streamService:StreamService,private authService:AuthService,private courseDataService:CourseDataService,private matDialog:MatDialog,private route:Router,private imageService:FileService,
    private sanitizer: DomSanitizer,private courseService:CourseService,private subjectService:SubjectService,private topicService:TopicService) { }

  ngOnInit(): void {
   
   
   this.getAllStreams();
   this.userId = JSON.parse(this.authService.currentUserValue()).body.id;
   //this.getAllCourseByUser();
   this.searchForm = this.formBuilder.group({
    stream:['All'],
    subject:['All'],
    topic:['All'],
    search:['']
   });

   this.getAllCourse();
   //console.log(this.userId)
   
   //this.getCoverImage("2140f8a3-da7c-46cd-a132-0d80f1d098fc")
    
  }
  // ngAfterViewInit() {
  //   this.streamSearch.nativeElement.addEventListner('change',()=>{

  //   })
  // }
  //search new method using hash reference
  
  getCoverImage(course:Course){
    //console.log(this.imageService.getImageById(index))

    this.imageService.getImageById(course.coverUrl).subscribe(data=>{
  
      this.image = data;
      this.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image));
      this.imageList.set(course.coverUrl,this.imageURL)
      
    }) 
  }

  getMyCourses(){
    this.courseService.getAllCourseByUserId(0).subscribe(data=>{
      console.log(data);
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
      this.courses = data;
       this.courseList.forEach(element => {
        this.getCoverImage(element)
      });
      this.filterDataByFilters();
    })
  }
  getAllStreams(){
    this.streamService.getStreamList().subscribe(data=>{
      this.streamList = data;
    })
  }

  public trackItem (index: number, item: Stream) {
    return item.id;
  }

  getAllSubject(){
    let stream = this.searchForm.get("stream")?.value
    //console.log(event.target.value)
    this.courseList = [];
    this.topicList = [];
    this.subjectList = [];
    if(stream == "All"){
      this.courseList = this.courses;
    }
    this.courses.forEach((data,index)=>{

      if(data.topic.subject.stream.id == stream){
        this.courseList.push(data);
        this.filterCourseByStream.push(data)
       
      }
    })
    
 
        this.subjectService.getSubjectByStreamId(this.searchForm.get("stream")?.value).subscribe(data=>{
          this.subjectList = data;
        })
  
  }

  getAllTopicBySubject(){
    let subject = this.searchForm.get("subject")?.value
    this.courseList = [];
   //console.log(event.target.value)
    if(subject == "All"){
      this.courseList = this.filterCourseBySubject;
    }else{
      this.filterCourseByStream.forEach((data,index)=>{
        console.log(data.topic.subject.id)
        if(data.topic.subject.id == subject){
         
          this.courseList.push(data)
          this.filterCourseBySubject.push(data)
        }
      });
    
      this.topicService.getTopicBySubject(subject).subscribe(data=>{
        this.topicList = data;
      });
     
    }
  }

  filterByTopic(){
    let topic = this.searchForm.get("topic")?.value
    this.courseList = [];
   
    if(topic == "All"){
      this.courseList = this.filterCourseBySubject;
    }else{
      this.filterCourseBySubject.forEach((data,index)=>{
        if(data.topic.id == topic){
          this.courseList.push(data)
          this.filterCourseByTopic.push(data);
        }
      })
    }
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
  
  filterDataByFilters(){
    console.log(this.searchForm)
    if(this.searchForm.get("stream")?.value != "All" && this.searchForm.get("subject")?.value == "All"){
      console.log(this.searchForm.get("subject")?.value)
      this.getAllSubject()
    }else if(this.searchForm.get("subject")?.value != "All" && this.searchForm.get("topic")?.value == "All"){
      this.getAllTopicBySubject()
    }else if(this.searchForm.get("topic")?.value != "All"){
      this.getAllTopicBySubject()
    }else{
      
    }
  }
getAllCourseByUser(){
  this.courseService.getAllCourseByUserId(this.userId).subscribe(data=>{
    console.log(data)
    this.courseList = []
    this.courseList = data;
    this.filterDataByFilters();
    this.myCourse = data;
    this.courseList.forEach(element => {
      this.getCoverImage(element)
    });
  })
}
radioButtonChange(v:any){
  console.log(this.searchForm)
  if(v.value == "2"){
    this.getAllCourseByUser();
  }else if(v.value == "1"){
    this.getAllCourse();
  }else{
    console.log("Error occured.")
  }
}
  searchByCourseName(){
   let searchtext = this.searchForm.get("search")?.value
   
   if(this.filterCourseByTopic.length > 0){
    this.courseList = this.filterCourseByTopic;
  }else if(this.filterCourseBySubject.length > 0){
    this.courseList = this.filterCourseBySubject;
  }else if(this.filterCourseByStream.length > 0){
    this.courseList = this.filterCourseByStream
  }else{
    this.courseList = this.courses;
  }
    if(this.searchForm.get("search")?.value != ""){
      this.searchCourseByName = this.courseList;
      this.courseList = [];
      this.searchCourseByName.forEach((data,index)=>{
        if(data.courseName.includes(searchtext)){
          this.courseList.push(data);
        }
      })
     
    }
    
  }


}
