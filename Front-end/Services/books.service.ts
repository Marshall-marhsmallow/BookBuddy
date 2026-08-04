import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, AddBookRequest, UpdateBookReq } from '../Models/book.model';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5028';
  getuserbooks(): Observable<any> {
    return this.http.get<Book[]>("http://localhost:5028/userbooks");
  }

  addbook(book: AddBookRequest): Observable<Response> {
    return this.http.post<Response>("http://localhost:5028/newbook", book);

  }
  DeleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletebook/${id}`);
  }

  EditBook(book : UpdateBookReq){
    return this.http.put(`${this.apiUrl}/editbook`,book);
  }
}