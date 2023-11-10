import { NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select'
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio'; 
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';


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
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatToolbarModule,
    AngularEditorModule,
    MatDividerModule,
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTooltipModule

  ]
})
export class MaterialModule { }
