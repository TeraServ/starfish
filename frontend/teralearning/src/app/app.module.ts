import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {MatDialogModule} from '@angular/material/dialog'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatSelectModule} from '@angular/material/select'
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetDialogComponent } from './dialogBoxs/forget-dialog/forget-dialog.component';

import { MatOptionModule } from '@angular/material/core';

import { HomeModule } from './home/home.module';
import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import { MatIconModule } from '@angular/material/icon';
import { SuccessDialogComponent } from './dialogBoxs/success-dialog/success-dialog.component';
import { NewUserComponent } from './app/new-user/new-user.component';
import { StreamComponent } from './stream/stream.component';
import { SubjectComponent } from './subject/subject.component';

import { MatFormFieldModule } from '@angular/material/form-field';

import { StreamListComponent } from './stream-list/stream-list.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StreamEditComponent } from './home/stream-edit/stream-edit.component';
import { SubjectEditComponent } from './home/subject-edit/subject-edit.component';
import { SubjectListComponent } from './home/subject-list/subject-list.component';
import { TopicComponent } from './topic/topic.component';
import { UserProfileComponent } from './user-profile/user-profile.component';




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
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatIconModule


  ],
  providers:  [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
