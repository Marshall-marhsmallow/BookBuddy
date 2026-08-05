namespace Records
{
    public record UpdateBookReq(int Id, string Title, string Author, bool Read);

    public record UpdateQuoteReq(int Id,string QuoteText,string Writer);
}