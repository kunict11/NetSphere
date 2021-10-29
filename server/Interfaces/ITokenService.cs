using server.Models;

namespace server.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}