import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { StreamService } from 'src/app/service/stream.service';
import { Stream } from 'src/model/stream.model';

@Component({
  selector: 'app-stream-edit',
  templateUrl: './stream-edit.component.html',
  styleUrls: ['./stream-edit.component.scss']
})
export class StreamEditComponent implements OnInit {

  EditStream!: Stream;
  isAlert = false;
  streamUpdate!: boolean;
  isDialogOpen!: boolean;
  streamBtn: boolean = false;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: Stream, private dialog: MatDialog, private streamService: StreamService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<StreamEditComponent>) {
    this.EditStream = data;
  }

  UpdatedStreamName!: string;
  UpdatedPrice!: number;
  UpdatedDiscounts!: number;
  UpdatedAcronym!: string;
  UpdatedStreamStatus!: number;


  ngOnInit(): void {
    this.UpdatedStreamName = this.EditStream.streamName;
    this.UpdatedPrice = this.EditStream.price;
    this.UpdatedDiscounts = this.EditStream.discount;
    this.UpdatedAcronym = this.EditStream.acronym;
    this.UpdatedStreamStatus = this.EditStream.streamStatus;



  }

  valuechange(newValue: any) {
    this.streamUpdate = true
    if (this.UpdatedStreamName == '' || this.UpdatedAcronym == '' || this.UpdatedPrice == undefined || this.UpdatedDiscounts == undefined || this.UpdatedPrice <= 0 || this.UpdatedDiscounts >= 100 && this.UpdatedDiscounts <= 0) {
      this.streamBtn = true
    }
    else {
      this.streamBtn = false
    }

  }
  UpdateStreamDetails() {
    if (this.UpdatedStreamName != '' && this.UpdatedPrice != 0 && this.UpdatedDiscounts != null && this.UpdatedAcronym != '') {

      console.log("calling UpdateStreamDetails")
      let UpdatedStreamDetails: Stream = {
        id: this.EditStream.id,
        streamName: this.UpdatedStreamName,
        price: this.UpdatedPrice,
        discount: this.UpdatedDiscounts,
        acronym: this.UpdatedAcronym,
        streamStatus: this.UpdatedStreamStatus,
      }
      if (this.streamUpdate) {
        this.streamService.updateStream(UpdatedStreamDetails).subscribe(data => {
          console.log(data);

          this.dialog.open(SuccessDialogComponent, {
            data:{message:"Successfully updated!"}
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
      this.streamBtn = true;
      this.snackBar.open("Invalid Entry", '', {
        duration: 3000
      })
    }

  }


}
