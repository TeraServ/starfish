import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from '../../models/subject.model';
import { SubjectService } from '../../services/subject.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Stream } from '../../models/stream.model';
import { StreamService } from '../../services/stream.service';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: Subject, private subjectService: SubjectService, private snackBar: MatSnackBar, private streamService: StreamService, private dialogRef: MatDialogRef<SubjectEditComponent>) {
    this.EditSubject = data;
  }

  UpdatedStream: Stream = new Stream();
  UpdatedsubjectName!: string;
  UpdatedsubjectStatus!: number;

  ngOnInit(): void {
    this.getStreams();

    console.log("wdwdwd", this.streamList);

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
      this.streamList = data;
      this.UpdatedStream = this.EditSubject.stream;
      this.UpdatedsubjectName = this.EditSubject.subjectName;
      this.UpdatedsubjectStatus = this.EditSubject.subjectStatus;
    })
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
          this.snackBar.open("Successfully updated!!", '', {
            duration: 3000
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

}
