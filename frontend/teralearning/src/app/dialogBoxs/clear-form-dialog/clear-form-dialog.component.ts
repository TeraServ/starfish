import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clear-form-dialog',
  templateUrl: './clear-form-dialog.component.html',
  styleUrls: ['./clear-form-dialog.component.scss']
})
export class ClearFormDialogComponent implements OnInit {

  message: string = "Are you sure want to cancel?"

  constructor(public dialogRef: MatDialogRef<ClearFormDialogComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.dialogRef.close({shouldClearForm:true});
  }
}
