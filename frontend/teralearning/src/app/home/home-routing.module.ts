import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './usermanagement/user-registration/user-registration.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './usermanagement/user-list/user-list.component';
import { SettingsComponent } from './settings/settings.component';
import { StreamListComponent } from './streams/stream-list/stream-list.component';
import { StreamComponent } from './streams/stream/stream.component';
import { SubjectComponent } from './subjects/subject/subject.component';
import { SubjectListComponent } from './subjects/subject-list/subject-list.component';
import { UserProfileComponent } from './settings/user-profile/user-profile.component';
import { BulkUserCreationComponent } from './usermanagement/bulk-user-creation/bulk-user-creation.component';
import { CourseComponent } from './courses/course/course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { EditQuizComponent } from './quizes/edit-quiz/edit-quiz.component';
import { QuizComponent } from './quizes/quiz/quiz.component';
import { TopicComponent } from './topics/topic/topic.component';
import { TopicListComponent } from './topics/topic-list/topic-list.component';
import { TopicEditComponent } from './topics/topic-edit/topic-edit.component';



const routes: Routes = [

 {
  path:"",
  component:HomeComponent,
  children:[
     {
      path:"dashboard",
      component: DashboardComponent,
      title:"Dashboard"
     },
      {
        path:"usermanagement/create",
        component:UserRegistrationComponent,
        title:"New User"
      },
      {
        path:"usermanagement/users",
        component:UserListComponent,
        title:"Users"
      },
      {
        path:"usermanagement/CreateBulkUsers",
        component:BulkUserCreationComponent
      },
      
      {
        path:"streams/create",
        component:StreamComponent
      },
      {
        path:"streams/list",
        component:StreamListComponent
      },
      {
        path:"subjects/create",
        component:SubjectComponent
      },
      {
        path:"subjects/list",
        component:SubjectListComponent
      },
      {
        path:"settings",
        component: SettingsComponent
      },
      {
        path:"settings/userProfile",
        component: UserProfileComponent
      },{
        path:"courses",
        component:CourseComponent,
        title:"Courses"
      },
      {
        path:"courses/edit",
        component:EditCourseComponent,
        title:"Edit Course"
      },
      {
        path:"quizes/quiz",
        component: QuizComponent
      },
      {
        path:"quizes/quiz/edit",
        component: EditQuizComponent
      },
      {
        path:"topics/create",
        component: TopicComponent
      },
      {
        path:"topics/edit",
        component: TopicEditComponent
      },
      {
        path:"topics/list",
        component: TopicListComponent
      }

  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
