using Book.Service;
using Microsoft.EntityFrameworkCore;


namespace BooksEndpoints
{
    public static class BookEndpoints
    {
        public record AddbookRequest (int userId, string title, string author, bool read);



        public static void MapBookEndpoints(this WebApplication app)
        {
            app.MapPost("/newbook", async (AddbookRequest req, BookServices service) =>
            {
                var success = await AddBook(req.userId, req.title, req.author, req.read);
            });
        }
    }
}