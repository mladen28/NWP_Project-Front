import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import {AllUsersComponent} from "./components/all-users/all-users.component";
import {AddUserComponent} from "./components/add-user/add-user.component";
import {EditUserComponent} from "./components/edit-user/edit-user.component";
import {LoginGuard} from "./guards/login.guard";
import {AllGuard} from "./guards/all.guard";
import {AddGuard} from "./guards/add.guard";
import {EditGuard} from "./guards/edit.guard";
import {AllVacuumsComponent} from "./components/all-vacuums/all-vacuums.component";
import {CreateVacuumControleComponent} from "./components/create-vacuumControl/create-vacuumControle.component";
import {ErrorHistoryComponent} from "./components/error-history/error-history.component";
import {ScheduleComponent} from "./components/schedule/schedule.component";
import {AllVacuumsGuard} from "./guards/all-vacuums.guard";
import {CreateVacuumsGuard} from "./guards/create-vacuums.guard";


const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canDeactivate: [LoginGuard]
  },
  {
    path: "vacuums",
    component: AllVacuumsComponent,
    canActivate: [AllVacuumsGuard]
  },
  {
    path: "add-vacuumControl",
    component: CreateVacuumControleComponent,
    canActivate: [CreateVacuumsGuard]
  },
  {
    path: "schedule/:id",
    component: ScheduleComponent,
    canActivate: [AllVacuumsGuard]
  },
  {
    path: "errors",
    component: ErrorHistoryComponent,
    canActivate: [AllVacuumsGuard]
  },
  {
    path: "all",
    component: AllUsersComponent,
    canActivate: [AllGuard]
  },
  {
    path: "add",
    component: AddUserComponent,
    canActivate: [AddGuard]
  },
  {
    path: "edit/:id",
    component: EditUserComponent,
    canActivate: [EditGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
