import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Apis';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-user-profile',
  imports: [Navbar],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  user: any;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        console.log('Received profile data:', data);
        this.user = data;
      },
      error: () => this.errorMessage = 'Failed to load profile.'
    });
  }
}