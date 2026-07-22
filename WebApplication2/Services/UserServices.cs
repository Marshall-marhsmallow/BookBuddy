using Users.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
namespace Users.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }
        // Method to validate the login credentials of a user
        public async Task<User?> ValidateLogin(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return user;
            }
            return null;
        }

        // Method to delete a user
        public async Task<bool> DeleteUser(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        // Method to update a user's name
        public async Task<bool> RenameUser(string oldUsername, string newUsername)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == oldUsername);
            if (user != null && !await UsernameExists(newUsername))
            {
                user.Username = newUsername;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        // Helper method to check if a username already exists
        public async Task<bool> UsernameExists(string username)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            return existingUser != null;
        }

        // Method to add a new user
        public async Task<bool> AddUser(string username, string email, string password)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (existingUser != null) return false;

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            var newUser = new User { Username = username, Password = hashedPassword };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}