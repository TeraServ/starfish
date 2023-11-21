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

import { MatInput, MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CacheResultPipe } from './pipes/cache-result.pipe';
import { ResourceNotFoundComponent } from './resource-not-found/resource-not-found.component';
import { EditQuestionComponent } from './home/quizes/edit-question/edit-question.component';
import { CustomeArraySortPipe } from './custome-array-sort.pipe';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { TopicListComponent } from './home/topics/topic-list/topic-list.component';
import { TopicEditComponent } from './home/topics/topic-edit/topic-edit.component';
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
    PasswordResetComponent,
    CacheResultPipe,
    ResourceNotFoundComponent,
    EditQuestionComponent,
    TopicListComponent,
    TopicEditComponent,
    ClearFormDialogComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    GooglePayButtonModule,
    MatInputModule,
    MatOptionModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: TitleStrategy, useClass: TeralearnTitleStrategyService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
