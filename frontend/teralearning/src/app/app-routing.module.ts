
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewUserComponent } from './new-user/new-user.component';
import { TopicComponent } from './topic/topic.component';
import { UserProfileComponent } from './home/settings/user-profile/user-profile.component';




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
    path:"register",
    component:NewUserComponent,
    title:"Purchase Stream"
  },



  {
    path: "topic",
    component: TopicComponent
  },

  {
    path: "userProfile",
    component: UserProfileComponent
  }


];

@NgModule({

  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
