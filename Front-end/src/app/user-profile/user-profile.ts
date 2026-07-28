import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Apis';
import { Navbar } from '../navbar/navbar';
import { Bookslist } from '../bookslist/bookslist';
import { user } from '../../../Models/user.models';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  imports: [Bookslist, Navbar,JsonPipe],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {

  loggeduser?: user;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        console.log("data", data);
        this.loggeduser = data;
        console.log("loogeduser", this.loggeduser);
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
      }
    });
  }
}