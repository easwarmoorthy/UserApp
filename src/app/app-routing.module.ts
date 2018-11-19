import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const routes: Route[] = [
  { path:"", component: AppComponent},
  { path:"login", component:LoginComponent},
  { path:"register", component:RegisterComponent},
  { path:"profile", component: ProfileComponent},
  { path:"users", component: UsersComponent},
  { path:"", redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
