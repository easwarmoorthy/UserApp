import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { LogoutComponent } from './logout/logout.component'
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component'

import { AuthGuard } from './auth.guard';


const routes: Route[] = [
  { path:"", redirectTo: '/login', pathMatch: 'full'},
  { path:"login", component:LoginComponent},
  { path:"register", component:RegisterComponent},
  { path:"profile", component: ProfileComponent, canActivate:[AuthGuard]},
  { path:"users", component: UsersComponent, canActivate:[AuthGuard]},
  { path:"logout", component: LogoutComponent},
  { path:"**", component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
