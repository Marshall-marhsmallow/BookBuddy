import { Component,signal,inject } from '@angular/core';
import { quote } from '../../../Models/quote.model'
import { QuotesService } from '../../../Services/quotes.service'
@Component({
  selector: 'app-quotes',
  imports: [],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class Quotes {
  quotes = signal<quote[]>([]);
  private quotesService = inject(QuotesService);
  ngOnInit() {
    this.quotesService.getUserQuotes().subscribe({
      next: (data) => {
        this.quotes.set(data)},
      error: (err) => console.error('Failed')
    });
  }
}
