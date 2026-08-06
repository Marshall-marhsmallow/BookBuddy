export interface quote{
    quoteId: number;
    userId: number;
    quoteText: string;
    writer: string;
    date: Date;
}


export interface AddQuoteRequest {
    QuoteText: string;
    writer: string;
}

export interface UpdateQuotereq{
    Id:number;
    QuoteText:string;
    Writer:string;
}