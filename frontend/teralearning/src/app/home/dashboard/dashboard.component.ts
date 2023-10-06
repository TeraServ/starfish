import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/service/subject.service';
import { TopicService } from 'src/app/service/topic.service';
import { Topic } from 'src/model/topic.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _subjectService: SubjectService,
    private _topicService: TopicService
  ) { }
  greetingMessage!:String;
  ngOnInit(): void {
    this.greetUser();
    this.createATopic();
  }
  greetUser(){
    const greetings: String[] = ['Good Morning','Good Afternoon','Good Evening'];
    const currentDate: Date = new Date();
    const currentHour:number = currentDate.getHours();
    let index:number = currentHour >= 12 && currentHour < 17 ? 1 : currentHour >= 17 ? 2 : 0 ;
    this.greetingMessage = greetings[index];
  }
  createATopic(){
    this._subjectService.getSubjectById(36).subscribe(data=>{
      console.log('Rxd Subject Data:'+data)
    },err=>{
      console.log('Error:'+err);
    })
    // let newTopic: Topic = {
    //   id:0,
    //   topicName:'New Topic',
    //   subject: this._subjectService.getSubject()
    // }
    // this._topicService.createTopic(newTopic).subscribe(resp=>{
    //   console.log(resp);
    // })

  }
}
