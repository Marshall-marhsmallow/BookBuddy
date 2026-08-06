using Quotes.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Records;

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
        public async Task<Quote?> AddnewQuote(int ID, AddQuotereq req)
        {
            var newQuote = new Quote
            {
                UserId = ID,
                QuoteText = req.QuoteText,
                Writer = req.Writer
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
        public async Task<Quote> UpdateQoute(UpdateQuoteReq req)
        {
            var FoundQoute = await _context.Quotes.FindAsync(req.Id);
            if (FoundQoute == null)
            { return null; }
            FoundQoute.QuoteText = req.QuoteText;
            FoundQoute.Writer = req.Writer;
            try
            {
                await _context.SaveChangesAsync();
                return FoundQoute;
            }
            catch (Exception ex)
            {
                Console.WriteLine("error", ex.Message);
                throw;
            }
        }

    }
}