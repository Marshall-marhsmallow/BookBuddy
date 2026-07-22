using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

public class TokenService
{
    private readonly string _key;
    private readonly string _issuer;
    private readonly string _audience;

    public TokenService()
    {
        _key = Environment.GetEnvironmentVariable("JWT_KEY")
            ?? throw new InvalidOperationException("JWT_KEY is not set in .env");
        _issuer = Environment.GetEnvironmentVariable("JWT_ISSUER")
            ?? throw new InvalidOperationException("JWT_ISSUER is not set in .env");
        _audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE")
            ?? throw new InvalidOperationException("JWT_AUDIENCE is not set in .env");
    }

    public string CreateToken(string username, string role = "User")
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}