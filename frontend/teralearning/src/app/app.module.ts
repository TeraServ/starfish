import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';


import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetDialogComponent } from './dialogBoxs/forget-dialog/forget-dialog.component';



import { HomeModule } from './home/home.module';
import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';

import { SuccessDialogComponent } from './dialogBoxs/success-dialog/success-dialog.component';
import { NewUserComponent } from './app/new-user/new-user.component';
import { StreamComponent } from './stream/stream.component';
import { SubjectComponent } from './subject/subject.component';



import { StreamListComponent } from './stream-list/stream-list.component';



import { StreamEditComponent } from './home/stream-edit/stream-edit.component';
import { SubjectEditComponent } from './home/subject-edit/subject-edit.component';
import { SubjectListComponent } from './home/subject-list/subject-list.component';
import { TopicComponent } from './topic/topic.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateCoursesComponent } from './create-courses/create-courses.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TitleStrategy } from '@angular/router';
import { TeralearnTitleStrategyService } from './_helpers/teralearn-title-strategy.service';
import { MaterialModule } from './shared/material/material.module';
import { ViewAndSearchComponent } from './core/view-and-search/view-and-search.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ForgetDialogComponent,
    NewUserComponent,
    StreamComponent,
    SubjectComponent,
    StreamListComponent,
    TopicComponent,
    UserProfileComponent,
    CreateCoursesComponent,
    ViewAndSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    MaterialModule
  ],
  providers:  [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: TitleStrategy, useClass: TeralearnTitleStrategyService}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
