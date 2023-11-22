import { Component, Inject, OnInit, Optional, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { InvalidFieldFocusDirective } from 'src/app/custom-directives/invalidfieldfocus.directive';
import { ClearFormDialogComponent } from 'src/app/dialogBoxs/clear-form-dialog/clear-form-dialog.component';
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
  streamUpdate: boolean = false;
  streamBtn: boolean = false;

  @ViewChild(InvalidFieldFocusDirective)
  invalidInputDirective!: InvalidFieldFocusDirective;
  @ViewChildren(NgControl) formControls!: QueryList<NgControl>;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: Stream, private dialog: MatDialog, private streamService: StreamService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<StreamEditComponent>) {
    this.EditStream = data;
  }

  UpdatedStreamName!: string;
  UpdatedPrice!: number;
  UpdatedDiscounts!: number;
  UpdatedAcronym!: string;
  UpdatedStreamStatus!: number;


  ngOnInit(): void {
    this.BuildForm();
  }


  BuildForm() {
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
      this.streamBtn = false    }

  }

  nullCheck() {
    return this.UpdatedStreamName == '' || this.UpdatedAcronym == '' || this.UpdatedPrice == undefined || this.UpdatedDiscounts == undefined || this.UpdatedPrice <= 0 || this.UpdatedDiscounts >= 100 && this.UpdatedDiscounts <= 0
  }

  UpdateStreamDetails() {
    
    const isNull = this.nullCheck();
    console.log("isMatching", isNull)
    this.invalidInputDirective.check(this.formControls);

    if ((this.UpdatedStreamName != this.data.streamName || this.UpdatedPrice != this.data.price || this.UpdatedDiscounts != this.data.discount || this.UpdatedAcronym != this.data.acronym) && !isNull) {

      this.streamUpdate = true
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
            data: { header: 'Successfully Updated', message: `${data.streamName} was updated.` }

          })
          this.dialogRef.close();
        });

      }

    }
    else {
      this.streamBtn = true;
      this.snackBar.open("No changes", '', {
        duration: 3000
      })
    }

  }
  getPreviousValue() {
    this.BuildForm();

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
