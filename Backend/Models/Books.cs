using Users.Models;

namespace Books.Models
{
    public class Book
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public bool Read { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
    }
    
}

