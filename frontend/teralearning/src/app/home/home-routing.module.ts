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



const routes: Routes = [

 {
  path:"",
  component:HomeComponent,
  children:[
     {
      path:"dashboard",
      component: DashboardComponent
     },
      {
        path:"usermanagement/create",
        component:UserRegistrationComponent
      },
      {
        path:"usermanagement/users",
        component:UserListComponent
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
      }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
