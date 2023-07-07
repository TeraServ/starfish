import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './usermanagement/user-registration/user-registration.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './usermanagement/user-list/user-list.component';
import { SettingsComponent } from './settings/settings.component';


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
        title:"Create User"
      },
      {
        path:"usermanagement/users",
        component:UserListComponent,
        title:"Users"
      },
      {
        path:"settings",
        component: SettingsComponent
      }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
