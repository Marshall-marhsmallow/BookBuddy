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
        public record UpdateBookReq(int Id, string Title, string Author, bool Read);
        public async Task<Book?> AddBook(int userId, string title, string author, bool read)
        {
            var newBook = new Book
            {
                UserId = userId,
                Title = title,
                Author = author,
                Read = read
            };
            try
            {
                _context.Books.Add(newBook);
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
                Console.WriteLine("error adding book " , ex.Message);
                return null;
            }
        }
        public async Task<Book?> FindBook(string name, int id)
        {
            try
            {
                var Foundbook = await _context.Books.FirstOrDefaultAsync(b => b.Title == name || b.BookId == id);
                if (Foundbook != null)
                {
                    return Foundbook;
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to connect to database", ex.Message);
                return null;
            }
        }
        public async Task<List<Book>?> GetuserBooks(int userId)
        {
            try
            {
                var UserBooks = await _context.Books
                .Where(b => b.UserId == userId).ToListAsync();
                return UserBooks;
            }
            catch (Exception ex)
            {
                Console.WriteLine("error getting users books" ,ex.Message);
                return null;
            }
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
                    return true;
                }
                return false;

            }
            catch (Exception ex)
            {
                Console.WriteLine("error: ", ex.Message);
                return false;
            }
        }
        public async Task<Book> UpdateBook(UpdateBookReq req)
        {
            var book = await _context.Books.FindAsync(req.Id);
            if (book == null) {
                return null;
            }
            try
            {
                book.Title = req.Title;
                book.Author = req.Author;
                book.Read = req.Read;
                await _context.SaveChangesAsync();
                return book;
            }
            catch (Exception ex)
            {
                Console.WriteLine("error", ex.Message);
                throw new Exception("Error updating book");
            }
        }

    }
}