import { Component } from '@angular/core';
import {Book} from '../../../Models/book.model';
import {OnInit} from '@angular/core';
import {BookService} from '../../../Services/books.service'
@Component({
  selector: 'app-bookslist',
  imports: [],
  templateUrl: './bookslist.html',
  styleUrl: './bookslist.css',
})
export class Bookslist implements OnInit{
  books: Book[] = [];
  constructor(private bookService: BookService) { }
  ngOnInit() {
    this.bookService.getuserbooks().subscribe(data => {
      console.log(data);
      this.books = data;}
    );
  }
}

