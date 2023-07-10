import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { StreamService } from '../../../service/stream.service';
import { SubjectService } from '../../../service/subject.service';
import { Stream } from 'src/model/stream.model';
import { Subject } from 'src/model/subject.model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})

export class SubjectComponent implements OnInit {

  createSubjectForm!: FormGroup;
  submitted: boolean = false;
  streamList: Stream[] = [];
  subject: Subject = new Subject();
  stream!: Stream;
  id!: number;
  subjectName!: string;
  subjectStatus: number = 1;
  dropStream!: Stream;




  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private streamService: StreamService, private subjectService: SubjectService,private dialog :MatDialog) { }

  ngOnInit(): void {
    this.createSubjectForm = this.formBuilder.group({
      subjectName: ['', [Validators.required]],
      stream:['',[Validators.required]],  
      //dropStream:new FormControl('',[Validators.required])
        

    });

    this.getStreamList();



  }


  createSubject() {

    let newSubject: Subject = {
      id: 0,
      stream: this.createSubjectForm.get("stream")?.value,
      subjectName: this.createSubjectForm.get("subjectName")?.value,
      subjectStatus: this.subjectStatus

    }
    console.log(newSubject)
    console.log(this.dropStream)
    this.subjectService.createSubject(newSubject).subscribe({
      next: (data: any) => {
        // this.snackBar.open("Successfully created.", '', {
        //   duration: 3000
        // })
        this.dialog.open(SuccessDialogComponent,{
          data:{message:"Successfully created!"}
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
  

  onSubmit() {

    this.submitted = true;
    console.log("onsubmit",this.createSubjectForm)

    if (this.createSubjectForm.invalid) {
      return;          
    }
    else{
      this.createSubject();  
      
    }
    this.createSubjectForm.reset();
      this.createSubjectForm.clearValidators();
      this.submitted = false;
    // this.subjectName = '';
    //   this.streamList = [];      
    //   this.submitted = false;
    

  }


}
