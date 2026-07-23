using Books.Services;
using Microsoft.EntityFrameworkCore;
using Superpower.Model;


namespace BooksEndpoints
{
    public static class BookEndpoints
    {
        public record AddbookRequest (int userId, string title, string author, bool read);
        

        public static void MapBookEndpoints(this WebApplication app)
        {
            app.MapPost("/newbook", async (AddbookRequest req, BookService service) =>
            {
                var success = await service.AddBook(req.userId, req.title, req.author, req.read);
            });

            app.MapGet("/userbooks", async (HttpContext http, BookService service) =>
            {
               var userIdClaim = http.User.FindFirst("userId")?.Value;
               if (userIdClaim == null)
                {
                    return Results.Unauthorized();
                }
                var userId = int.Parse(userIdClaim);
                var success = await service.GetuserBooks(userId);
                 return Results.Ok(success);
            }).RequireAuthorization();

            app.MapDelete("/bookdelete", async (int Bookid, BookService service) =>
            {
                try
                {
                    var response = await service.DeleteBook(Bookid);
                    return Results.Ok(response);
                } 
                catch (Exception ex)
                {
                    return Results.Ok(ex.Message);
                }
            }).RequireAuthorization();
        }
        
    }
}