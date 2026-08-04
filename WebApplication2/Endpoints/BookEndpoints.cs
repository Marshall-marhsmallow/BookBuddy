using Books.Services;
using Microsoft.EntityFrameworkCore;
using Superpower.Model;
using Records;

namespace BooksEndpoints
{
    public static class BookEndpoints
    {
        public record AddbookRequest(int userId, string title, string author, bool read);

        public static void MapBookEndpoints(this WebApplication app)
        {
            app.MapPost("/newbook", async (HttpContext http, AddbookRequest req, BookService service) =>
            {
                var userIdClaim = http.User.FindFirst("userId")?.Value;
                if (userIdClaim == null)
                {
                    return Results.Unauthorized();
                }
                try
                {
                    var userId = int.Parse(userIdClaim);
                    var success = await service.AddBook(userId, req.title, req.author, req.read);
                    return Results.Ok(success);
                }
                catch (Exception ex)
                {
                    return Results.BadRequest(ex.Message);
                }
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
                    return Results.BadRequest(ex.Message);
                }
            }).RequireAuthorization();
            app.MapPut("/editbook", async (UpdateBookReq req, BookService service) =>
            {
               try {
                var response = await service.UpdateBook(req);
                 if (response != null)
                    {
                        return Results.Ok(response);
                    }
                    else
                    {
                        return Results.NotFound("The Book Was not Found");
                    }
                }
                catch (Exception ex)
                {
                    return Results.BadRequest(ex.Message);
                }
            });
        }

    }
}