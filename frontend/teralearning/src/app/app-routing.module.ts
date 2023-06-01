import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamComponent } from './stream/stream.component';
import { AppComponent } from './app.component';
import { SubjectComponent } from './subject/subject.component';
import { StreamListComponent } from './stream-list/stream-list.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
