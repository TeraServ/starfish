import { Component, OnInit } from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forget-dialog',
  templateUrl: './forget-dialog.component.html',
  styleUrls: ['./forget-dialog.component.scss']
})
export class ForgetDialogComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<ForgetDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
