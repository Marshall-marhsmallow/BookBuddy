import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { quote, AddQuoteRequest, UpdateQuotereq } from '../Models/quote.model';
import { environment } from '../src/environments/environment.development';



@Injectable({
    providedIn: 'root'
})
export class QuotesService {
    private http = inject(HttpClient);
    private basseUrl = environment.apiUrl;

    getUserQuotes(): Observable<any> {
        return this.http.get<quote[]>(`${this.basseUrl}/userquotes`);
    }
    addQuote(quote: AddQuoteRequest) {
        return this.http.post(`${this.basseUrl}/newquote`, quote);

    }
    EditQuote(quote : UpdateQuotereq):Observable<any>{
        return this.http.put(`${this.basseUrl}/updatequote`, quote);
    }
    Deletequote(id :number): Observable<any>{
        return this.http.delete(`${this.basseUrl}/quotedelete/${id}`);
    }
}