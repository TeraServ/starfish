import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
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

import { SubjectComponent } from './home/subjects/subject/subject.component';



import { StreamListComponent } from './home/streams/stream-list/stream-list.component';

import { MatPaginatorModule } from '@angular/material/paginator';

import { TopicComponent } from './topic/topic.component';
import { MaterialModule } from './shared/material/material.module';
import { TeralearnTitleStrategyService } from './_helpers/teralearn-title-strategy.service';
import { ViewAndSearchComponent } from './core/view-and-search/view-and-search.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { UserUpdateComponent } from './home/usermanagement/user-update/user-update.component';
import { TitleStrategy } from '@angular/router';
import { UserRegistrationComponent } from './home/usermanagement/user-registration/user-registration.component';
import { UserListComponent } from './home/usermanagement/user-list/user-list.component';
import { SubjectListComponent } from './home/subjects/subject-list/subject-list.component';
import { SubjectEditComponent } from './home/subjects/subject-edit/subject-edit.component';
import { StreamComponent } from './home/streams/stream/stream.component';
import { StreamEditComponent } from './home/streams/stream-edit/stream-edit.component';
import { UserProfileComponent } from './home/settings/user-profile/user-profile.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {GooglePayButtonModule} from '@google-pay/button-angular'
import { CreateCoursesComponent } from './create-courses/create-courses.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ForgetDialogComponent,
    NewUserComponent,
    SubjectComponent,
    StreamListComponent,
    TopicComponent,
    ViewAndSearchComponent, 
    PasswordResetComponent,
    CreateCoursesComponent


   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableModule,
    GooglePayButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    



  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: TitleStrategy, useClass: TeralearnTitleStrategyService}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
