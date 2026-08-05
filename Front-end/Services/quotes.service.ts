import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { quote, AddQuoteRequest } from '../Models/quote.model';



@Injectable({
    providedIn: 'root'
})
export class QuotesService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5028';

    getUserQuotes(): Observable<any> {
        return this.http.get<quote[]>(`${this.apiUrl}/userquotes`);
    }
    addQuote(quote: AddQuoteRequest) {
        return this.http.post(`${this.apiUrl}/newquote`, quote);

    }
    EditQuote(){
        
    }
}