import { Component, inject,signal } from '@angular/core';
import { Book } from '../../../Models/book.model';
import { OnInit } from '@angular/core';
import { BookService } from '../../../Services/books.service'
@Component({
  selector: 'app-bookslist',
  imports: [],
  templateUrl: './bookslist.html',
  styleUrl: './bookslist.css',
})
export class Bookslist {
  books = signal<Book[]>([]);
  private bookService = inject(BookService);
  ngOnInit() {
    this.bookService.getuserbooks().subscribe({
      next: (data) => {
        this.books.set(data);
      },
      error: (err) => console.error('Failed to fetch books:', err),
    });
  }
}
