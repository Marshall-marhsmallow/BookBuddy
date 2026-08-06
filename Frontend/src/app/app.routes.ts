import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { UserProfile } from './user-profile/user-profile';
import { AuthGuard } from '../../Services/auth.guard';
import { Register } from './register/register';
import { Addbook } from './addbook/addbook';
import { Bookslist } from './bookslist/bookslist';
import { Quotes } from './quotes/quotes';
import { QuoteForm } from './quote-form/quote-form';
export const routes: Routes = [
  { path: 'login', component: Login,
    canActivate: [AuthGuard],
    data: {requiresAuth :false}
   },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'profile',
    component: UserProfile,
    canActivate: [AuthGuard],
    data: {requiresAuth: true}
  },
  {path: 'register', component: Register,
    canActivate: [AuthGuard],
    data: {requiresAuth: false}
  },
  {path:'newbook', component: Addbook},
  {path:'newbook/:id/edit', component: Addbook},
  {path:'newquote', component: QuoteForm},
  {path:'newquote/:id/edit', component: QuoteForm}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}