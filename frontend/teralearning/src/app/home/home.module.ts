import { SubjectComponent } from './subjects/subject/subject.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { MatProgressBarModule } from '@angular/material/progress-bar'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserProfileComponent } from './settings/user-profile/user-profile.component';
import { StreamEditComponent } from './streams/stream-edit/stream-edit.component';
import { StreamComponent } from './streams/stream/stream.component';
import { SubjectEditComponent } from './subjects/subject-edit/subject-edit.component';
import { SubjectListComponent } from './subjects/subject-list/subject-list.component';
import { StreamListComponent } from './streams/stream-list/stream-list.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { BulkUserCreationComponent } from './usermanagement/bulk-user-creation/bulk-user-creation.component';

import { CSVHandlerService } from '../core/services/csvhandler.service';
import { MaterialModule } from '../shared/material/material.module';
import { CsvEditFormComponent } from './usermanagement/csv-edit-form/csv-edit-form.component';
import { CourseComponent } from './courses/course/course.component';

import { NewCourseComponent } from './courses/new-course/new-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PageComponent } from './courses/page/page.component';
import { ChapterComponent } from './courses/chapter/chapter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DeleteDialogComponent } from '../dialogBoxs/delete-dialog/delete-dialog.component';
import { DeleteMessageDialogComponent } from '../dialogBoxs/delete-message-dialog/delete-message-dialog.component';
import { AddQuestionComponent } from './course/add-question/add-question.component';
import { PreviewQuestionComponent } from './course/preview-question/preview-question.component';
import { AddQuizComponent } from './quizes/add-quiz/add-quiz.component';
import { EditQuizComponent } from './quizes/edit-quiz/edit-quiz.component';
import { QuizComponent } from './quizes/quiz/quiz.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { CustomeArraySortPipe } from '../custome-array-sort.pipe';
import { EditQuestionComponent } from './quizes/edit-question/edit-question.component';
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
    CsvEditFormComponent,
    SubjectComponent,
    SubjectListComponent,
    UserProfileComponent,
    StreamComponent,
    StreamEditComponent,
    StreamListComponent,
    SubjectEditComponent,
    CourseComponent,
    NewCourseComponent,
    EditCourseComponent,
    PageComponent,
    ChapterComponent,
    AddQuizComponent,
    QuizComponent,
    EditQuizComponent,
    AddQuestionComponent,
    PreviewQuestionComponent,
    SuccessDialogComponent,
    DeleteDialogComponent,
    DeleteMessageDialogComponent,
    CustomeArraySortPipe,
    SafeHtmlPipe

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
    MatSidenavModule,
    MaterialModule,
    AngularEditorModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    DragDropModule,
    MatTooltipModule

  ],
  providers: [
    CSVHandlerService
  ]
})
export class HomeModule { }
