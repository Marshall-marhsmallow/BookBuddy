export interface quote{
    QuoteId: number;
    UserId: number;
    QuoteText: string;
    Writer: string;
    Date: Date;
}


export interface AddQuoteRequest {
    Quotetxt: string;
    writer: string;
}

export interface UpdateQuotereq{
    Id:number;
    QuoteText:string;
    Writer:string;
}