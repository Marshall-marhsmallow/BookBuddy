using Users.Services;
using Microsoft.EntityFrameworkCore;

namespace WebApplication2.Endpoints // Adjusted namespace to match project structure.
{
    public static class UserEndpoints
    {
        public record LoginRequest(string Username, string Password);

        public record RenameRequest(string OldUsername, string NewUsername);

        public record AddUserRequest(string Username, string Email, string Password);

        public static void MapUserEndpoints(this WebApplication app)
        {
            // Login: validate creds, issue JWT as httpOnly cookie
            app.MapPost("/login", async (LoginRequest req, UserService service, TokenService tokenService, HttpContext http) =>
            {
                var user = await service.ValidateLogin(req.Username, req.Password);
                if (user is null)
                    return Results.Unauthorized();

                var token = tokenService.CreateToken(user.Username);

                http.Response.Cookies.Append("access_token", token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddMinutes(30)
                });

                return Results.Ok(new { user.Username });
            });

            // Logout: clear the cookie
            app.MapPost("/logout", (HttpContext http) =>
            {
                http.Response.Cookies.Delete("access_token");
                return Results.Ok();
            });

            // Delete: only the account owner or an admin can delete
            app.MapDelete("/delete/{username}", async (string username, UserService service, ClaimsPrincipal caller) =>
            {
                if (caller.Identity?.Name != username && !caller.IsInRole("Admin"))
                    return Results.Forbid();

                var success = await service.DeleteUser(username);
                return success
                    ? Results.Ok($"User {username} deleted successfully.")
                    : Results.NotFound($"No user found with the username: {username}");
            }).RequireAuthorization();

            // Rename: only the account owner can rename themselves
            app.MapPut("/rename", async (RenameRequest req, UserService service, ClaimsPrincipal caller) =>
            {
                if (caller.Identity?.Name != req.OldUsername)
                    return Results.Forbid();

                var success = await service.RenameUser(req.OldUsername, req.NewUsername);
                return success
                    ? Results.Ok($"User {req.OldUsername} renamed to {req.NewUsername} successfully.")
                    : Results.BadRequest("Failed to rename user or username already exists.");
            }).RequireAuthorization();

            // Add user: stays open (registration), password now in body not query string
            app.MapPost("/add", async (AddUserRequest req, UserService service) =>
            {
                var success = await service.AddUser(req.Username, req.Email, req.Password);
                return success
                    ? Results.Ok($"User {req.Username} added successfully.")
                    : Results.Conflict("Username already exists");
            });

            // Exists check: require auth to prevent username enumeration by anonymous callers
            app.MapGet("/exists/{username}", async (string username, UserService service) =>
            {
                var response = await service.UsernameExists(username);
                return response ? Results.Ok() : Results.NotFound($"Username {username} does not exist.");
            }).RequireAuthorization();
        }
    }
}