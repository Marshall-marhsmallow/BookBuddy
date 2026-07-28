import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, AddBookRequest } from '../Models/book.model';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private http = inject(HttpClient);

  getuserbooks() {
    return this.http.get<Book[]>("http://localhost:5028/userbooks");
  }

   addbook(book: AddBookRequest): Observable<Response> {
    return this.http.post<Response>("http://localhost:5028/newbook", book);
    
  }

}