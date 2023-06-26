import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  createSubjectForm!: FormGroup;
  submitted: boolean = false;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.createSubjectForm = this.formBuilder.group({
      streamName: ['', [Validators.required]],
      subjectName: ['',[Validators.required]],
      
    });
  }
  onSubmit() {
    this.submitted = true;
  }

}
