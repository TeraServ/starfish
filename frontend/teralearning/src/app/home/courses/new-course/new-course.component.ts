import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { AuthService } from 'src/app/service/auth.service';
import { CourseService } from 'src/app/service/course.service';
import { FileService } from 'src/app/service/file.service';

import { StreamService } from 'src/app/service/stream.service';
import { SubjectService } from 'src/app/service/subject.service';
import { TopicService } from 'src/app/service/topic.service';
import { Course } from 'src/model/course.model';
import { Stream } from 'src/model/stream.model';
import { Subject } from 'src/model/subject.model';
import { Topic } from 'src/model/topic.model';
@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private matDialogRef:MatDialogRef<NewCourseComponent>,
  private successDialog:MatDialog,private uploadService:FileService,
  private courseService:CourseService,private streamService:StreamService,
  private subjectService:SubjectService,private formBuilder:FormBuilder,
  private authService:AuthService,private topicService:TopicService) { }
  showLoader:boolean = false;
  streamList:Stream[]=[]
  subjectList:Subject[]=[];
  topic:Topic[]=[];
  courseForm!:FormGroup;
  userId!:number;
  title!:string;
  isEditable:boolean = false;
  updateData!:Course;
  submitted:boolean = false;
  ngOnInit(): void {
    this.getAllStreams();
    this.courseForm = this.formBuilder.group({
      courseName:['',Validators.required],
      stream:['',Validators.required],
      subject:['',Validators.required],
      topic:['',Validators.required],
      coverUrl:[null,Validators.required],
      description:['',Validators.required],
      imageFile:[null,Validators.required]
      

    });
    if(this.data != ''){
      this.title = "Edit Course";
      this.isEditable = true;
      this.courseForm.get("courseName")?.setValue(this.data.courseName);
      this.courseForm.get("description")?.setValue(this.data.description);
      this.courseForm.get("topic")?.setValue(this.data?.topic);
      this.courseForm.get("subject")?.setValue(this.data?.topic?.subject);
      this.courseForm.get("stream")?.setValue(this.data?.topic.subject.stream);
      
      

    }else{
      this.title = "New Course";
      this.courseForm.get("courseName")?.setValue("");
      this.courseForm.get("description")?.setValue("");
      this.courseForm.get("topic")?.setValue("");
      this.courseForm.get("subject")?.setValue("");
      this.courseForm.get("stream")?.setValue("");
    }
    this.userId = this.authService.getCurrentUserDetails().id;
    this.updateData  =this.data;
    console.log(this.data)
  }
  getAllStreams(){
    this.streamService.getStreamList().subscribe(data=>{
      this.streamList = data;
      console.log(data);
    })
  }
  uploadCover(file:any){
    const imageFile  = file.target.files.item(0);
    console.log(imageFile)
    const formData:FormData = new FormData();
    formData.append('file',imageFile,imageFile.name);
    console.log(formData)
    this.uploadService.uploadCoverImage(formData).subscribe(data=>{
      console.log(data)
      this.courseForm.get("coverUrl")?.setValue(data.id);
    })

  }
  getSubjectByStream(){
    let selectedStream = this.courseForm.get("stream")?.value;
    
    if(selectedStream != ""){
      this.subjectService.getSubjectByStreamId(selectedStream.id).subscribe(data=>{
        console.log(data)
        this.subjectList = data;
      })
    }else{
      
    }
  }
  getTopicBySubject(){
    let selectedSubject = this.courseForm.get("subject")?.value;
    console.log(selectedSubject)
    if(selectedSubject != ""){
      this.topicService.getFilteredTopic(selectedSubject.id).subscribe(data=>{
        console.log(data)
        this.topic = data;
      })
    }
  }
  get f(){
    return this.courseForm.controls;
  }
  onSubmit(){
    this.submitted = true;
    if(this.courseForm.invalid){
      console.log(this.courseForm)
      return;
    }else{
      
      if(!this.isEditable){
        let course:Course = {
          id: 0,
          courseName:this.courseForm.get("courseName")?.value,
          coverUrl:this.courseForm.get("coverUrl")?.value,
          description:this.courseForm.get("description")?.value,
          topic:this.courseForm.get("topic")?.value,
          createdBy:this.userId,
          chapters:[]
        }
        this.saveCourse(course)
      }else{
        let course:Course = {
          id: this.updateData.id,
          courseName:this.courseForm.get("courseName")?.value,
          coverUrl:this.courseForm.get("coverUrl")?.value,
          description:this.courseForm.get("description")?.value,
          topic:this.courseForm.get("topic")?.value,
          createdBy:this.userId,
          chapters:this.updateData.chapters
        }
        this.saveCourse(course)
      }
     
    }
  }
    saveCourse(course:Course){
      this.courseService.addCourse(course).subscribe(data=>{
        this.matDialogRef.close()
        this.successDialog.open(SuccessDialogComponent,{data:{message:"Successfully created"}})
      })  
    }
   

}
