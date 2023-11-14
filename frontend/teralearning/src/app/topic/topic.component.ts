import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubjectService } from '../service/subject.service';
import { StreamService } from '../service/stream.service';
import { Stream } from 'src/model/stream.model';
import { Subject } from 'src/model/subject.model';
import { TopicService } from '../service/topic.service';
import { Topic } from 'src/model/topic.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  createTopicForm!: FormGroup;
  submitted: boolean = false;
  streamList: Stream[] = [];
  FilteredsubjectList: Subject[] = [];
  topic: Topic = new Topic();
  userId:any;


  constructor(private formBuilder: FormBuilder,private authService:AuthService,private subjectService: SubjectService, private streamService: StreamService,private topicService:TopicService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.createTopicForm = this.formBuilder.group({
      streamName: ['', [Validators.required]],
      subjectName: ['',[Validators.required]],
      topicName: ['',[Validators.required]],
      
    });
    this.getStreamList();  
    this.userId = JSON.parse(this.authService.currentUserValue()).body.id;
  }

  getStreamList() {
    this.streamService.getStreamList().subscribe((data: Stream[]) => {
      this.streamList = data;
      console.log("streamlist", this.streamList);
    })
  }

  getSubjectList() {
    console.log("streamidddd",this.createTopicForm.get('streamName')?.value.id)
    this.subjectService.getFilteredSubject(this.createTopicForm.get('streamName')?.value.id).subscribe((data) => {
      console.log("subjectList",data.body)
      this.FilteredsubjectList = data.body;
      console.log("Filteredsubjectlist", this.FilteredsubjectList)
    
    })
  }

  createTopic(){
    let newTopic: Topic = {
      id: 0,
      stream: this.createTopicForm.get("streamName")?.value,
      subject: this.createTopicForm.get("subjectName")?.value,
      topicName: this.createTopicForm.get("topicName")?.value,
      createdBy:this.userId,
      ModifiedBy:this.userId

    }
    console.log(newTopic)
    
    this.topicService.createTopic(newTopic).subscribe({
      next: (data: any) => {
        this.snackBar.open("Successfully created.", '', {
          duration: 3000
        })
      },
      error: (e: any) => console.error(e)
    })


  }


  onSubmit() {
    this.submitted = true;
    if(this.createTopicForm.invalid){
      return;
    }
    else{
      this.createTopic();  
      
    }
    this.createTopicForm.reset();
      this.createTopicForm.clearValidators();
      this.submitted = false;
    
  }
}
