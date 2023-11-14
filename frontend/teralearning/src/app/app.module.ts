import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetDialogComponent } from './dialogBoxs/forget-dialog/forget-dialog.component';

import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';




import { TopicComponent } from './home/topics/topic/topic.component';
import { MaterialModule } from './shared/material/material.module';
import { TeralearnTitleStrategyService } from './_helpers/teralearn-title-strategy.service';
import { PasswordResetComponent } from './password-reset/password-reset.component';

import { TitleStrategy } from '@angular/router';

import { GooglePayButtonModule } from '@google-pay/button-angular';
import { NewUserComponent } from './new-user/new-user.component';

import { ResourceNotFoundComponent } from './resource-not-found/resource-not-found.component';
import { EditQuestionComponent } from './home/quizes/edit-question/edit-question.component';
import { TopicListComponent } from './home/topics/topic-list/topic-list.component';
import { TopicEditComponent } from './home/topics/topic-edit/topic-edit.component';
import { CommonModule } from '@angular/common';
import { AlphabeticSortPipe } from './pipes/alphabetic-sort.pipe';
import { CustomeArraySortPipe } from './custome-array-sort.pipe';
import { SharedElementModule } from './shared/material/shared-element.module';
import { ShowFocusDirective } from './custom-directives/show-focus.directive';
import { ClearFormDialogComponent } from './dialogBoxs/clear-form-dialog/clear-form-dialog.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ForgetDialogComponent,
    PasswordResetComponent,
    TopicComponent,
    NewUserComponent,
    ResourceNotFoundComponent,
    EditQuestionComponent,
    TopicListComponent,
    TopicEditComponent,
    
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    GooglePayButtonModule,
    SharedElementModule
  

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: TitleStrategy, useClass: TeralearnTitleStrategyService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
