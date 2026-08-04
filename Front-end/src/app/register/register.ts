// register.ts
import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/Apis';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  username = '';
  password = '';
  message = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.username, this.password).pipe(
      switchMap(() => this.authService.login(this.username, this.password))
    ).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: () => {
        this.message.set( 'Registration failed. Please try again later.');
      }
    });
  }
}