using Users.Models;

namespace Quotes.Models
{
    public class Quote
    {
        public int QuoteId { get; set; }
        public int UserId { get; set; }
        public string QuoteText { get; set; }
        public DateTime Date { get; set; } =  DateTime.UtcNow;
        public User? User { get; set; }
    }
}