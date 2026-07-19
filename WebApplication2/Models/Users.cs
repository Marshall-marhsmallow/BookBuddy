using Books.Models;
using Quotes.Models;

namespace Users.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public List<Quote> QuotesItems { get; set; } = new();

        public List<Book> BooksItems { get; set; } = new();
    }
}