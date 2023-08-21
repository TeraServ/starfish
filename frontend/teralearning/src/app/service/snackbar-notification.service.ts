import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarNotificationService {

  constructor(public snackBar:MatSnackBar) { }
  config: MatSnackBarConfig = {
    duration:3000,
  
  }
  success(message:string){
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(message, 'Close',this.config);
  }
  warning(message:string){
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(message, 'Close',this.config);
  }
}
