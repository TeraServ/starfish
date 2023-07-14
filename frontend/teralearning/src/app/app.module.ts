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

import { SuccessDialogComponent } from './dialogBoxs/success-dialog/success-dialog.component';
import { NewUserComponent } from './new-user/new-user.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TopicComponent } from './topic/topic.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { TitleStrategy } from '@angular/router';
import { TeralearnTitleStrategyService } from './_helpers/teralearn-title-strategy.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ForgetDialogComponent,
    NewUserComponent,
    TopicComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
