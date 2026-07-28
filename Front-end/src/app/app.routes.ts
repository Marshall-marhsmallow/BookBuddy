import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { UserProfile } from './user-profile/user-profile';
import { AuthGuard } from '../../Services/auth.guard';
import { Register } from './register/register';
import { Addbook } from './addbook/addbook';
export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: UserProfile
  },
  {path: 'register', component: Register},
  {path:'newbook', component: Addbook}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}