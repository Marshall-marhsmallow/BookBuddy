import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../../Services/books.service';
import { AddBookRequest } from '../../../Models/book.model';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addbook',
  imports: [ReactiveFormsModule],
  templateUrl: './addbook.html',
  styleUrl: './addbook.css',
})
export class Addbook {
  constructor(private bookService: BookService) { }
  private router = inject(Router);
  newbook = new FormGroup({
    Title: new FormControl('', [Validators.required]),
    Author: new FormControl('', [Validators.required]),
    Read: new FormControl(false)
  });
  hasError(field: string, error: string): boolean {
    const control = this.newbook.get(field);
    return !!control?.touched && !!control?.hasError(error);
  }
  onSubmit(): void {
    if (this.newbook.invalid) {
      this.newbook.markAllAsTouched();
      return;
    }

    this.bookService.addbook(this.newbook.value as AddBookRequest).subscribe({
      next: (status) => console.log(status),
      complete: () => this.router.navigate(['/profile']),
      error: (err) => console.error('Failed to add book', err),
    });
  }

}
