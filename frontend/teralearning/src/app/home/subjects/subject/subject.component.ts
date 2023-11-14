import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { StreamService } from '../../../service/stream.service';
import { SubjectService } from '../../../service/subject.service';
import { Stream } from 'src/model/stream.model';
import { Subject } from 'src/model/subject.model';
import { ClearFormDialogComponent } from 'src/app/dialogBoxs/clear-form-dialog/clear-form-dialog.component';
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




  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog,private streamService: StreamService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getStreamList();
  }

  buildForm(){
    this.createSubjectForm = this.formBuilder.group({
      subjectName: ['', [Validators.required]],
      stream:['',[Validators.required]],        

    });
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
    this.subjectService.createSubject(newSubject).subscribe(data => {
      this.dialog.open(SuccessDialogComponent, { data: { message: "Subject created Successfully" } })
      this.clearValidations();
    }, err => {
      this.snackBar.open(err.error, '', { duration: 3000 })
      console.log(err)
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
  clearValidations(): void {
    this.createSubjectForm.reset();
    Object.keys(this.createSubjectForm.controls).forEach(key => {
      this.createSubjectForm.get(key)?.markAsUntouched();
      this.createSubjectForm.get(key)?.markAsPristine();
    }) 
    this.submitted=false;
    this.buildForm();
  }
  
  cancelDetails() {
    const dialogRef = this.dialog.open(ClearFormDialogComponent)
    .afterClosed().subscribe(data => {
      if (data.shouldClearForm) {
        this.clearValidations();
      }
    });
  }


}
