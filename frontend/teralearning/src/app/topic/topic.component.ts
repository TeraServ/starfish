import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  createTopicForm!: FormGroup;
  submitted: boolean = false;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.createTopicForm = this.formBuilder.group({
      streamName: ['', [Validators.required]],
      subjectName: ['',[Validators.required]],
      topicName: ['',[Validators.required]],
      
    });
  }
  onSubmit() {
    this.submitted = true;
  }
}
