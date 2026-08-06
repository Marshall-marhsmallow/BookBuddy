import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, AddBookRequest, UpdateBookReq } from '../Models/book.model';
import { environment } from '../src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  getuserbooks(): Observable<any> {
    return this.http.get<Book[]>(`${this.baseUrl}/userbooks`);
  }

  addbook(book: AddBookRequest): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/newbook`, book);

  }
  DeleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletebook/${id}`);
  }

  EditBook(book : UpdateBookReq){
    return this.http.put(`${this.baseUrl}/editbook`,book);
  }
}