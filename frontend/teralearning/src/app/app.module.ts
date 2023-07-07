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

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TopicComponent } from './topic/topic.component';
import { MaterialModule } from './shared/material/material.module';
import { TeralearnTitleStrategyService } from './_helpers/teralearn-title-strategy.service';
import { TitleStrategy } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';





@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ForgetDialogComponent,
    NewUserComponent,
    SubjectComponent,
    StreamListComponent,
    TopicComponent
   
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: TitleStrategy, useClass: TeralearnTitleStrategyService}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
