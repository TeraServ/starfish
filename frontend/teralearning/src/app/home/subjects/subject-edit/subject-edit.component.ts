import { Component, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgControl } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvalidFieldFocusDirective } from 'src/app/custom-directives/invalidfieldfocus.directive';
import { ClearFormDialogComponent } from 'src/app/dialogBoxs/clear-form-dialog/clear-form-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { StreamService } from 'src/app/service/stream.service';
import { SubjectService } from 'src/app/service/subject.service';
import { Stream } from 'src/model/stream.model';
import { Subject } from 'src/model/subject.model';


@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.scss']
})
export class SubjectEditComponent implements OnInit {

  EditSubject!: Subject;
  isAlert = false;
  streamList: Stream[] = [];
  subjectUpdate: boolean = false;
  isDialogOpen!: boolean;
  streamBtn: boolean = false;
  @ViewChild(InvalidFieldFocusDirective)
  invalidInputDirective!: InvalidFieldFocusDirective;
  @ViewChildren(NgControl) formControls!: QueryList<NgControl>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Subject, private subjectService: SubjectService, private snackBar: MatSnackBar, private streamService: StreamService, private dialog: MatDialog, private dialogRef: MatDialogRef<SubjectEditComponent>) {
    this.EditSubject = data;
    console.log("this.EditSubject", this.EditSubject)
  }

  UpdatedStream!: Stream 
  UpdatedsubjectName!: string;
  UpdatedsubjectStatus!: number;

  ngOnInit(): void {
    this.getStreams();

  }
  valuechange(newValue: any) {
    console.log("valuechange",newValue)
    this.subjectUpdate = true
    if (this.UpdatedsubjectName == '') {
      this.streamBtn = true
    }
    else {
      this.streamBtn = false
    }

  }
  getStreams() {
    this.streamService.getStreamList().subscribe(data => {
      this.streamList = this.getSortedSubjects(data);

      this.UpdatedStream = this.EditSubject.stream;
      this.UpdatedsubjectName = this.EditSubject.subjectName;
      this.UpdatedsubjectStatus = this.EditSubject.subjectStatus;
    })
  }

  nullCheck(){
    return this.UpdatedsubjectName=='' || this.UpdatedStream == null

  }
  getSortedSubjects(data: Stream[]): Stream[] {
    return data.sort((a, b) => (a.streamName).localeCompare(b.streamName))

  }

  UpdateSubjectDetails() {
    this.invalidInputDirective.check(this.formControls);

    if ((this.UpdatedsubjectName != this.data.subjectName || this.UpdatedStream != this.data.stream) && !this.nullCheck()) {
      this.subjectUpdate = true

      console.log("calling UpdateSujectDetails")
      console.log(this.UpdatedsubjectName)
      let UpdateSubjectDetails: Subject = {
        id: this.EditSubject.id,
        stream: this.UpdatedStream,
        subjectName: this.UpdatedsubjectName,
        subjectStatus: this.UpdatedsubjectStatus,


      }
      console.log(UpdateSubjectDetails)

      if (this.subjectUpdate) {
        this.subjectService.updateSubject(UpdateSubjectDetails).subscribe(data => {
          console.log(data);
          this.dialog.open(SuccessDialogComponent, {
            data: { header: 'Successfully Updated', message: `${data.subjectName} was updated.` }

          })
          this.dialogRef.close();

        });
      }
     

    }
    else {
      this.isDialogOpen = false;
      this.snackBar.open("No changes", '', {
        duration: 3000
      })
    }

  }
  getPreviousValue() {
    this.getStreams();

  }

  cancelDetails() {
    const dialogRef = this.dialog.open(ClearFormDialogComponent)
      .afterClosed().subscribe(data => {
        if (data.shouldClearForm) {
          this.getPreviousValue();
        }
      });
  }


}
