import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  streamUpdate: boolean = false;
  isDialogOpen!: boolean;
  streamBtn: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Subject, private subjectService: SubjectService, private snackBar: MatSnackBar, private streamService: StreamService, private dialog: MatDialog, private dialogRef: MatDialogRef<SubjectEditComponent>) {
    this.EditSubject = data;
    console.log("this.EditSubject",this.EditSubject)
  }

  UpdatedStream: Stream = new Stream();
  UpdatedsubjectName!: string;
  UpdatedsubjectStatus!: number;

  ngOnInit(): void {
    this.getStreams();

  }
  valuechange(newValue: any) {
    this.streamUpdate = true
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

  getSortedSubjects(data: Stream[]): Stream[] {

    return data.sort((a, b) => (a.streamName).localeCompare(b.streamName))


  }

  UpdateSubjectDetails() {

    if (this.UpdatedsubjectName != '' && this.UpdatedStream != null) {

      console.log("calling UpdateSujectDetails")
      console.log(this.UpdatedsubjectName)
      let UpdateSubjectDetails: Subject = {
        id: this.EditSubject.id,
        stream: this.UpdatedStream,
        subjectName: this.UpdatedsubjectName,
        subjectStatus: this.UpdatedsubjectStatus,


      }
      console.log(UpdateSubjectDetails)

      if (this.streamUpdate) {
        this.subjectService.updateSubject(UpdateSubjectDetails).subscribe(data => {
          console.log(data);
          this.dialog.open(SuccessDialogComponent, {
            data: { header: 'Successfully Updated', message: `${data.subjectName} was updated.` }

          })
          this.dialogRef.close();

        });
      }
      else {
        this.snackBar.open("No changes", '', {
          duration: 3000
        })

      }

    }
    else {
      this.isDialogOpen = false;
      this.snackBar.open("Invalid Entry", '', {
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
