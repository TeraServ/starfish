import { SubjectComponent } from './subjects/subject/subject.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationComponent } from './usermanagement/user-registration/user-registration.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './usermanagement/user-list/user-list.component';
import { SettingsComponent } from './settings/settings.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserUpdateComponent } from './usermanagement/user-update/user-update.component';
import { MatIconModule } from '@angular/material/icon'
import { NoopAnimationPlayer } from '@angular/animations';
import { SuccessDialogComponent } from '../dialogBoxs/success-dialog/success-dialog.component';
import { MatProgressBarModule} from '@angular/material/progress-bar'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserProfileComponent } from './settings/user-profile/user-profile.component';
import { StreamEditComponent } from './streams/stream-edit/stream-edit.component';
import { StreamComponent } from './streams/stream/stream.component';
import { SubjectEditComponent } from './subjects/subject-edit/subject-edit.component';
import { SubjectListComponent } from './subjects/subject-list/subject-list.component';
import { StreamListComponent } from './streams/stream-list/stream-list.component';
import {MatSidenavModule} from '@angular/material/sidenav'
import { BulkUserCreationComponent } from './usermanagement/bulk-user-creation/bulk-user-creation.component';

import { CSVHandlerService } from '../core/services/csvhandler.service';
@NgModule({
  declarations: [

    UserRegistrationComponent,
    HomeComponent,
    DashboardComponent,
    UserListComponent,
    SettingsComponent,
    UserUpdateComponent,
    SuccessDialogComponent,
    BulkUserCreationComponent,
    SubjectComponent,
    SubjectListComponent,
    UserProfileComponent,
    StreamComponent,
    StreamEditComponent,
    StreamListComponent,
    SubjectEditComponent
    
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDialogModule,
    HttpClientModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSidenavModule


  ],
  providers:[
    CSVHandlerService
  ]
})
export class HomeModule { }
