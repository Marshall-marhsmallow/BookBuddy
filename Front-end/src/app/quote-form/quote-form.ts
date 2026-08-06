import { Component, inject, signal } from '@angular/core';
import { QuotesService } from '../../../Services/quotes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { AddQuoteRequest, quote, UpdateQuotereq } from '../../../Models/quote.model';
@Component({
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.css',
})
export class QuoteForm {
  private qouteService = inject(QuotesService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);

  isEditMode = signal(false);
  message = signal<string | null>(null);
  quoteId: number | null = null;
  private passedquote: quote | undefined;

  constructor() {
    const nav = this.router.currentNavigation();
    this.passedquote = nav?.extras?.state?.['quote'] as quote | undefined;
    console.log(this.passedquote);
  }
  newquote = new FormGroup({
    quoteText: new FormControl('', [Validators.required]),
    writer: new FormControl('', [Validators.required])
  });

  hasError(field: string, error: string) {
    const control = this.newquote.get(field);
    return !!control?.touched && control.hasError(error);
  }

  ngOnInit(): void {
    if (this.passedquote) {
      this.isEditMode.set(true);
      this.newquote.patchValue(this.passedquote);
      this.quoteId = this.passedquote.quoteId;
    }
  }

  onSubmit(): void {
    if (this.newquote.invalid) {
      this.newquote.markAllAsTouched();
      return;
    }
    else if (this.isEditMode()) {
      const req = { Id: this.quoteId, ...this.newquote.value };
      this.qouteService.EditQuote(req as UpdateQuotereq).subscribe({
        next: () => this.router.navigate(['/profile']),
      });
    }
    else {
      this.qouteService.addQuote(this.newquote.value as AddQuoteRequest).subscribe({
        next: (status) => console.log(status),
        complete: () => this.router.navigate(['/profile']),
        error: (err) => console.error(err)
      });
    }

  }
}
