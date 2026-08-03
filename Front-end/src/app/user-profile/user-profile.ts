import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../../Services/Apis';
import { Navbar } from '../navbar/navbar';
import { Bookslist } from '../bookslist/bookslist';
import { user } from '../../../Models/user.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [Bookslist, Navbar],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfile implements OnInit {
  
  private router = inject(Router);
  private authService = inject(AuthService);
  loggedUser = signal<user>({ userId: 0, username: 'null' });
  
ngOnInit(): void {
  this.authService.getUserProfile().subscribe({
    next: (res: any) =>  {this.loggedUser.set(res)},
    error: (err) => this.router.navigate(['/login'])
  });
}
}