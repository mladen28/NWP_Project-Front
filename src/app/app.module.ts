import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AllVacuumsComponent } from './components/all-vacuums/all-vacuums.component';
import { CreateVacuumControleComponent } from './components/create-vacuumControl/create-vacuumControle.component';
import { ErrorHistoryComponent } from './components/error-history/error-history.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import {MatRadioModule} from "@angular/material/radio";


@NgModule({
  declarations: [
    AppComponent,
    AllUsersComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    AllVacuumsComponent,
    CreateVacuumControleComponent,
    ErrorHistoryComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
