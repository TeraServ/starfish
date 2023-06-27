import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { StreamService } from '../service/stream.service';
import { SubjectService } from '../service/subject.service';
import { Stream } from 'src/model/stream.model';
import { Subject } from 'src/model/subject.model';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})

export class SubjectComponent implements OnInit {

  // createSubjectForm!: FormGroup<any>;
  
  submitted: boolean = false;
  streamList: Stream[] = [];
  subject: Subject = new Subject();
  stream!: Stream;
  id!: number;
  subjectName!: string;
  subjectStatus: number = 1;
  dropStream!: Stream;
  



  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private streamService: StreamService, private subjectService: SubjectService) { }

  ngOnInit(): void {

    this.getStreamList();



  }
  

  createSubject() {

    let newSubject: Subject = {
      id: 0,
      stream: this.dropStream,
      subjectName: this.subjectName,
      subjectStatus: this.subjectStatus

    }
    console.log(newSubject)
    console.log(this.dropStream)
    this.subjectService.createSubject(newSubject).subscribe({
      next: (data: any) => {
        this.snackBar.open("Successfully created.", '', {
          duration: 3000
        })
      },
      error: (e: any) => console.error(e)
    })

  }

  getStreamList() {
    this.streamService.getStreamList().subscribe((data: Stream[]) => {
      this.streamList = data;
      console.log(this.streamList);
    })
  }
  onReset(form: NgForm): void {
    form.reset();
  }

  onSubmit() {

    this.submitted = true;
    
    if (this.dropStream && this.subjectName) {

      
      this.createSubject();

      this.subjectName= '';
     // this.dropStream.streamName = null
      

      

      this.submitted = false;
      //window.location.reload()
    }


  }


}
