
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './app/new-user/new-user.component';
;


const routes: Routes = [

  {
    path:"",
    component: LoginPageComponent
  },
  {
    path:"home",
    loadChildren: () => import('./home/home.module').then(mod=>mod.HomeModule)
  },
  {
    path:"register",
    component:NewUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
