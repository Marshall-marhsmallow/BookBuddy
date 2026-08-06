import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../../Services/books.service';
import { AddBookRequest, Book, UpdateBookReq } from '../../../Models/book.model';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-addbook',
  imports: [ReactiveFormsModule],
  templateUrl: './addbook.html',
  styleUrl: './addbook.css',
})
export class Addbook implements OnInit {
  private bookService = inject(BookService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = signal(false);
  message = signal<string | null>(null);
  BookId: number | null = null;
  private passedBook: Book | undefined;
  newbook = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    read: new FormControl(false)
  });
  hasError(field: string, error: string): boolean {
    const control = this.newbook.get(field);
    return !!control?.touched && !!control?.hasError(error);
  }
  constructor() {
    const nav = this.router.currentNavigation();
    this.passedBook = nav?.extras?.state?.['book'] as Book | undefined;
  }
  ngOnInit(): void {
    if (this.passedBook) {
      this.isEditMode.set(true);
      this.newbook.patchValue(this.passedBook);
      this.BookId = this.passedBook.bookId;
    }
  }
  onSubmit(): void {
    if (this.newbook.invalid) {
      this.newbook.markAllAsTouched();
      return;
    }
    else if (this.isEditMode()) {
      const req = { Id: this.BookId, ...this.newbook.value }
      this.bookService.EditBook(req as UpdateBookReq).subscribe({
        next: () => this.router.navigate(['/profile']),
      });
    }
    else {

      this.bookService.addbook(this.newbook.value as AddBookRequest).subscribe({
        next: (status) => console.log(status),
        complete: () => this.router.navigate(['/profile']),
        error: (err) => console.error('Failed to add book', err),
      });
    }
  }

}

