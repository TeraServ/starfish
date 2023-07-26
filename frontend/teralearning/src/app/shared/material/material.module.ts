import { NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select'
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [],
  exports: [
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDialogModule,
    MatInputModule
    
  ]
})
export class MaterialModule { }
