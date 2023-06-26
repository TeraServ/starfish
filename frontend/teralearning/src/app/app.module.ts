import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StreamComponent } from './stream/stream.component';
import { SubjectComponent } from './subject/subject.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { StreamListComponent } from './stream-list/stream-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { TopicComponent } from './topic/topic.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatPaginatorModule } from '@angular/material/paginator';
import { StreamEditComponent } from './stream-edit/stream-edit.component';
import {MatIconModule} from '@angular/material/icon'
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    SubjectComponent,
    StreamListComponent,
    TopicComponent,
    StreamEditComponent,
    SubjectListComponent,
    SubjectEditComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
