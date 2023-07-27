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




import { TopicComponent } from './topic/topic.component';
import { MaterialModule } from './shared/material/material.module';
import { TeralearnTitleStrategyService } from './_helpers/teralearn-title-strategy.service';
import { ViewAndSearchComponent } from './core/view-and-search/view-and-search.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

import { TitleStrategy } from '@angular/router';

import { GooglePayButtonModule } from '@google-pay/button-angular';
import { CreateCoursesComponent } from './create-courses/create-courses.component';
import { NewUserComponent } from './new-user/new-user.component';

import { MatInput, MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';







@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ForgetDialogComponent,
    ViewAndSearchComponent, 
    PasswordResetComponent,
    TopicComponent,
    CreateCoursesComponent,
    NewUserComponent
 
   
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
    GooglePayButtonModule,
    MatInputModule,
    MatOptionModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: TitleStrategy, useClass: TeralearnTitleStrategyService}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
