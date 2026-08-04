using Quotes.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Quotes.Service
{
    public class QuoteService
    {
        private readonly AppDbContext _context;

        public QuoteService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Quote>?> FinduserQuotes(int id)
        {
            try
            {
                var Foundquotes = await _context.Quotes
                .Where(q => q.UserId == id).ToListAsync();
                return Foundquotes;
            }
            catch (Exception ex)
            {
                Console.WriteLine("error finding quote" + ex);
                return null;
            }

        }
        public async Task<Quote?> AddnewQuote(int userID, string Quotetxt, string writer)
        {
            var newQuote = new Quote
            {
                UserId = userID,
                QuoteText = Quotetxt,
                Writer = writer
            };
            try
            {
                _context.Quotes.Add(newQuote);
                var res = await _context.SaveChangesAsync();
                if (res >= 1)
                {
                    return newQuote;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("error adding new qoute", ex.Message);
                return null;
            }

        }
        public async Task<bool> Deleteqoute(int ID)
        {
            try
            {
                var quote = await _context.Quotes.FindAsync(ID);
                if (quote == null)
                {
                    return false;
                }
                _context.Quotes.Remove(quote);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("error", ex.Message);
                return false;
            }
        }
        public async Task<Quote> UpdateQoute(int ID,string Quotetxt, string writer)
        {
            var FoundQoute = await _context.Quotes.FindAsync(ID);
            if (FoundQoute == null)
            {return null;}
                FoundQoute.QuoteText = Quotetxt;
                FoundQoute.Writer = writer;
            try
            {
                await _context.SaveChangesAsync();
                return FoundQoute;
            }
            catch(Exception ex)
            {
                Console.WriteLine("error", ex.Message);
                throw;
            }
        }

    }
}