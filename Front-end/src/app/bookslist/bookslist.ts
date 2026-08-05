import { Component, inject, signal } from '@angular/core';
import { Book } from '../../../Models/book.model';
import { OnInit } from '@angular/core';
import { BookService } from '../../../Services/books.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookslist',
  imports: [],
  templateUrl: './bookslist.html',
  styleUrl: './bookslist.css',
})
export class Bookslist {
  books = signal<Book[]>([]);
  private bookService = inject(BookService);
  private router = inject(Router);
  ngOnInit() {
    this.bookService.getuserbooks().subscribe({
      next: (data) => {
        this.books.set(data);
      },
      error: (err) => console.error('Failed to fetch books:', err),
    });
  }
  Deletebook(id: number) {
    this.bookService.DeleteBook(id).subscribe({
      next: (Response) => {
        if (Response == true) {
          //handle the response by shwoing a notification and 
          //refreshing the fetch?
        }
      },
      error: (err) => console.error('Failed to delete', err),

    });
  }
  Editbook(book : Book) : void{
    this.router.navigate(['/newbook',book.bookId, 'edit'],{state:{book}});
  }
}