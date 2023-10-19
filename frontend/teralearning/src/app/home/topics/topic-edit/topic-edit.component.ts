import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Topic } from 'src/model/topic.model';
import { Stream } from '../../../models/stream.model';
import { StreamService } from '../../../service/stream.service';
import { TopicService } from '../../../service/topic.service';
import { AuthService } from '../../../service/auth.service';
import { SuccessDialogComponent } from '../../../dialogBoxs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-topic-edit',
  templateUrl: './topic-edit.component.html',
  styleUrls: ['./topic-edit.component.scss']
})
export class TopicEditComponent implements OnInit {

  EditTopic!: Topic;
  isAlert = false;
  topicUpdate: boolean = false;
  topicBtn: boolean = false;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: Topic, private authservice: AuthService, private dialog: MatDialog, private topicService: TopicService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<TopicEditComponent>) {
    this.EditTopic = data;
  }


  UpdatedTopicName!: string

  ngOnInit(): void {

    this.UpdatedTopicName = this.EditTopic.topicName
  }

  ValueChange() {
    this.topicUpdate = true;

  }

  UpdateTopic() {
    if (this.UpdatedTopicName != '') {

      console.log("calling UpdateTopic")
      let UpdatedTopic: Topic = {
        id: this.EditTopic.id,
        stream: this.EditTopic.stream,
        subject: this.EditTopic.subject,
        topicName: this.UpdatedTopicName,
        createdBy: this.EditTopic.createdBy,
        ModifiedBy: JSON.parse(this.authservice.currentUserValue()).body.id

      }
      if (this.topicUpdate) {
        this.topicService.updateTopic(UpdatedTopic).subscribe(data => {

          if (data.topicName == this.UpdatedTopicName) {
            this.dialog.open(SuccessDialogComponent, { data: { message: "Successfully Saved!" } })
            this.dialogRef.close();
          }
        });

      }
      else {
        this.snackBar.open("No changes", '', {
          duration: 3000
        })

      }

    }
    else {
      this.topicBtn = true;
      this.snackBar.open("Invalid Entry", '', {
        duration: 3000
      })
    }

  }


}
