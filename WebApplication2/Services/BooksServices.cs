using Books.Models;
using Microsoft.EntityFrameworkCore;




namespace Books.Services
{public class BookService
{
    private readonly AppDbContext _context;
    public BookService(AppDbContext context)
        {
            _context = context;
        }

public async Task<Book?> AddBook(int userId, string title, string author, bool read)
{
    var newBook = new Book { Title = title, Author = author, Read = read, UserId = userId };
    _context.Books.Add(newBook);

    try
    {
        var res = await _context.SaveChangesAsync();
        if (res >= 1)
        {
            return newBook;
        }
        else
        {
            return null;
        }
    }
    catch (Exception ex)
    {
        // At minimum, log this somewhere so you can debug later
        Console.WriteLine($"Error adding book: {ex.Message}");
        return null;
    }
    public async Task<Book?> FindBook(string name, int id)
        {
            try{
            var Foundbook = await _context.Books.FirstOrDefaultAsync(b => b.Title == name || b.BookId == id);
            if (Foundbook != null)
            {
                return Foundbook;
            }
            return null;}
            catch (Exception ex)
            {
               Console.WriteLine("Failed to connect to database", ex);
              return null;  
            }
        }
        public async Task<bool> DeleteBook (int id)
        {
            var book = await FindBook ("" ,id);
            if (book != null)
            {
                try
                {
                    
                }
            }
        }
}

}}