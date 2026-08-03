import { Component, inject } from '@angular/core';
import { QuotesService } from '../../../Services/quotes.service';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { AddQuoteRequest } from '../../../Models/quote.model';
@Component({
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.css',
})
export class QuoteForm {
  private qouteService = inject(QuotesService);
  
  private router = inject(Router);

  newquote = new FormGroup({
    Quotetxt: new FormControl('', [Validators.required]),
    Writer: new FormControl('', [Validators.required])
  });
  hasError(field: string, error:string){
    const control = this.newquote.get(field);
    return !!control?.touched && control.hasError(error);
  }
  onSubmit():void {
    if (this.newquote.invalid)
    {
      this.newquote.markAllAsTouched();
      return;
    }
    this.qouteService.addQuote(this.newquote.value as AddQuoteRequest).subscribe({
      next: (status) => console.log(status),
      complete: () => this.router.navigate(['/profile']),
      error: (err) => console.error(err)
    });
  }
}
