import { Title } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

import { NewUserComponent } from './new-user/new-user.component';

import { StreamListComponent } from './home/streams/stream-list/stream-list.component';

import { SubjectComponent } from './home/subjects/subject/subject.component';

import { SubjectListComponent } from './home/subjects/subject-list/subject-list.component';
import { TopicComponent } from './home/topics/topic/topic.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { QuizComponent } from './home/quizes/quiz/quiz.component';
import { EditQuizComponent } from './home/quizes/edit-quiz/edit-quiz.component';
import { ResourceNotFoundComponent } from './resource-not-found/resource-not-found.component';
import { TopicListComponent } from './home/topics/topic-list/topic-list.component';
import { TopicEditComponent } from './home/topics/topic-edit/topic-edit.component';





const routes: Routes = [


  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: "home",
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: "register",
    component: NewUserComponent
  },

  
  {
    path: "resetpassword",
    component: PasswordResetComponent,
    title: "Reset Password"
  },
  {
    path: "quizes/quiz",
    component: QuizComponent
  },
  {
    path: "quizes/quiz/edit/:quizName",
    component: EditQuizComponent
  },
  // {
  //   path: "**",pathMatch:'full',
  //   component: ResourceNotFoundComponent
  // }

];

@NgModule({

  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
