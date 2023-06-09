import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './usermanagement/user-registration/user-registration.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';


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
        path:"usermanagement",
        component:UserRegistrationComponent
      },
      {
        path:"users",
        component:UserListComponent
      }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
