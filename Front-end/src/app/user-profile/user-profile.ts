import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../../Services/Apis';
import { Bookslist } from '../bookslist/bookslist';
import { user } from '../../../Models/user.models';
import { Router } from '@angular/router';
import { Quotes } from '../quotes/quotes';

@Component({
  selector: 'app-user-profile',
  imports: [Bookslist,Quotes ],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfile implements OnInit {
  
  private router = inject(Router);
  private authService = inject(AuthService);
  loggedUser = signal<user>({ userId: 0, username: 'null' });
  activeView= signal<'quotes' | 'books'>('books');
  setView(view: 'books' | 'quotes'){
    this.activeView.set(view);
  }
ngOnInit(): void {
  this.authService.getUserProfile().subscribe({
    next: (res: any) =>  {this.loggedUser.set(res)},
    error: (err) => this.router.navigate(['/login'])
  });
}
logout(){
  this.authService.logout().subscribe({
    next: () => this.router.navigate(['/login'])
  })
}
}