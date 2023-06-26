import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationComponent } from './usermanagement/user-registration/user-registration.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './usermanagement/user-list/user-list.component';
import { SettingsComponent } from './settings/settings.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserUpdateComponent } from './usermanagement/user-update/user-update.component';
import {MatIconModule} from '@angular/material/icon'
import { NoopAnimationPlayer } from '@angular/animations';
import { SuccessDialogComponent } from '../dialogBoxs/success-dialog/success-dialog.component';

@NgModule({
  declarations: [
    
    UserRegistrationComponent,
    HomeComponent,
    DashboardComponent,
    UserListComponent,
    SettingsComponent,
    UserUpdateComponent,
    SuccessDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDialogModule,
    HttpClientModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
    
    
  ]
})
export class HomeModule { }
