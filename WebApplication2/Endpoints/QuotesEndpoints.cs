
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Quotes.Service;

namespace QuotesEndpoints
{
    public static class QuotesEndpoints
    {
        public record Addquoterequest(int userID, string Quotetxt, string writer);
        public static void MapQuotesEndpoints(this WebApplication app)
        {
            app.MapPost("/newquote", async (HttpContext http, Addquoterequest req, QuoteService service) =>
            {
                var userIdClaim = http.User.FindFirst("userId")?.Value;
                if (userIdClaim == null)
                {
                    return Results.Unauthorized();
                }
                var userid = int.Parse(userIdClaim);
                try
                {
                    var success = await service.AddnewQuote(userid, req.Quotetxt, req.writer);
                    if (success != null)
                    {
                        return Results.Ok(success);
                    }
                    else
                    {
                        return Results.Conflict();
                    }
                }
                catch (Exception ex)
                {
                    return Results.BadRequest(ex.Message);
                }

            }).RequireAuthorization();


            app.MapDelete("/quotedelete/{ID}", async (int ID, QuoteService service) =>
            {
                try
                {
                    var success = await service.Deleteqoute(ID);
                    if (success == true)
                    {
                        return Results.Ok("Quote deleted successfully");
                    }
                    else
                    {
                        return Results.Conflict("Failed to delete quote");
                    }
                }
                catch (Exception ex)
                {
                    return Results.BadRequest(ex.Message);
                }
            }).RequireAuthorization();

            app.MapGet("/userquotes", async (HttpContext http, QuoteService service) =>
            {
                var userIdClaim = http.User.FindFirst("userId")?.Value;
                if (userIdClaim == null)
                {
                    return Results.Unauthorized();
                }
                var userid = int.Parse(userIdClaim);
                try
                {
                    var success = await service.FinduserQuotes(userid);
                    if (success != null)
                    {
                        return Results.Ok(success);
                    }
                    else
                    {
                        return Results.Conflict("Failed to find quotes");
                    }
                }
                catch (Exception ex)
                {
                    return Results.BadRequest(ex.Message);
                }
            }).RequireAuthorization();
            app.MapPut("/updatequote", async (int ID, string Qoutetxtm, string Writer,QuoteService service) =>
            {
                try
                {
                    var success = await service.UpdateQoute(ID, Qoutetxtm, Writer);
                    if (success != null)
                    {
                        return Results.Ok("Quote updated successfully");
                    }
                    else
                    {
                        return Results.NotFound("Failed to update quote");
                    }
                }
                    catch (Exception ex)
                    {
                        return Results.BadRequest(ex.Message);
                    }
            }).RequireAuthorization();
        }
    }
}