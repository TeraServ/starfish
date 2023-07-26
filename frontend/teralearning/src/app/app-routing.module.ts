import { Title } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { StreamListComponent } from './home/streams/stream-list/stream-list.component';

import { SubjectComponent } from './home/subjects/subject/subject.component';

import { SubjectListComponent } from './home/subjects/subject-list/subject-list.component';
import { TopicComponent } from './topic/topic.component';
import { CreateCoursesComponent } from './create-courses/create-courses.component';
import { ViewAndSearchComponent } from './core/view-and-search/view-and-search.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { NewUserComponent } from './new-user/new-user.component';




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
    path:"topic",
    component: TopicComponent
  },
  {
    path: "createCourse",
    component:CreateCoursesComponent,
    title: "Create a Course"
  },{
    path:'viewandsearch',
    component:ViewAndSearchComponent,
    title: "View Users"
  },
  {
    path:"resetpassword",
    component:PasswordResetComponent,
    title:"Reset Password"
  },
  

];

@NgModule({

  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
