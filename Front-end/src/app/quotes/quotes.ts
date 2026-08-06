import { Component, signal, inject } from '@angular/core';
import { quote } from '../../../Models/quote.model'
import { QuotesService } from '../../../Services/quotes.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-quotes',
  imports: [],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class Quotes {
  quotes = signal<quote[]>([]);
  private quotesService = inject(QuotesService);
  private router = inject(Router)
  ngOnInit() {
    this.quotesService.getUserQuotes().subscribe({
      next: (data) => {
        console.log(data);
        this.quotes.set(data)
      },
      error: (err) => console.error('Failed')
    });
  }
  Deletequote(id: number) {
    this.quotesService.Deletequote(id).subscribe({
      next: (Response) => {
        if (Response == true) {
          this.quotesService.getUserQuotes().subscribe({
            next: (data) => {
              this.quotes.set(data)
            },
            error: (err) => console.error('Failed')
          });
        }
      },
      error: (err) => console.error('failed to delete', err),

    });
  }
  Editquote(quote: quote) {
    this.router.navigate(['/newquote', quote.quoteId, 'edit'], { state: { quote } });
  }
}
