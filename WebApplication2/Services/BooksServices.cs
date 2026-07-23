using Books.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;




namespace Books.Services
{
    public class BookService
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

        }

        public async Task<List<Book>> GetuserBooks(int userId)
        {
            try
            {
                var UserBooks = await _context.Books
                .Where(b => b.UserId == userId).ToListAsync();
                return UserBooks;
            }
            catch (Exception ex){Console.WriteLine("error getting users books");
            return null;}
        }
        public async Task<bool> DeleteBook(int Bookid)
        {
            try
            {
                var book = await _context.Books.
                FindAsync(Bookid);

                if (book != null)
                {
                    _context.Books.Remove(book);
                    await _context.SaveChangesAsync();
                    return false;
                }
                return false;

            }
            catch (Exception ex)
            {
                Console.WriteLine("error: " , ex.Message);
                return false;
            }
        }

    }
}