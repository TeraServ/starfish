import { SubjectComponent } from './subjects/subject/subject.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './usermanagement/user-registration/user-registration.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './usermanagement/user-list/user-list.component';
import { SettingsComponent } from './settings/settings.component';
import { UserUpdateComponent } from './usermanagement/user-update/user-update.component';
import { SuccessDialogComponent } from '../dialogBoxs/success-dialog/success-dialog.component';
import { UserProfileComponent } from './settings/user-profile/user-profile.component';
import { StreamEditComponent } from './streams/stream-edit/stream-edit.component';
import { StreamComponent } from './streams/stream/stream.component';
import { SubjectEditComponent } from './subjects/subject-edit/subject-edit.component';
import { SubjectListComponent } from './subjects/subject-list/subject-list.component';
import { StreamListComponent } from './streams/stream-list/stream-list.component';
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
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DeleteDialogComponent } from '../dialogBoxs/delete-dialog/delete-dialog.component';
import { DeleteMessageDialogComponent } from '../dialogBoxs/delete-message-dialog/delete-message-dialog.component';
import { AddQuestionComponent } from './course/add-question/add-question.component';
import { PreviewQuestionComponent } from './course/preview-question/preview-question.component';
import { AddQuizComponent } from './quizes/add-quiz/add-quiz.component';
import { EditQuizComponent } from './quizes/edit-quiz/edit-quiz.component';
import { QuizComponent } from './quizes/quiz/quiz.component';
import {CdkAccordion, CdkAccordionModule} from '@angular/cdk/accordion';
import { ChapterQuizComponent } from './courses/chapter-quiz/chapter-quiz.component';
import { SharedModule } from '../shared/shared.module';
import { CustomeArraySortPipe } from '../custome-array-sort.pipe';
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
    ChapterQuizComponent,
    CustomeArraySortPipe
  
    
    
    

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AngularEditorModule,
    DragDropModule,
    CdkAccordionModule,
    SharedModule

  ],
  providers: [
    CSVHandlerService
  ]
})
export class HomeModule { }
