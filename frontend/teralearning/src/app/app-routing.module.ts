import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamComponent } from './stream/stream.component';
import { AppComponent } from './app.component';
import { SubjectComponent } from './subject/subject.component';
import { StreamListComponent } from './stream-list/stream-list.component';
import { TopicComponent } from './topic/topic.component';
import { HttpClientModule } from '@angular/common/http';
import { StreamEditComponent } from './stream-edit/stream-edit.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [  
  {
    path:"stream",
    component: StreamComponent
  },
  {
    path:"streamList",
    component: StreamListComponent
  },
  {
    path:"subject",
    component: SubjectComponent
  },
  {
    path:"subjectList",
    component: SubjectListComponent
  },
  {
    path:"topic",
    component: TopicComponent
  },
  {
    path:"streamEdit",
    component:StreamEditComponent
  },
  {
    path:"userProfile",
    component:UserProfileComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
