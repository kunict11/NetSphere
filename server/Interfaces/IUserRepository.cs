using System.Collections.Generic;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IUserRepository
    {
         Task<User> GetUserByUsernameAsync(string username);
         Task<bool> SaveAllAsync();
         void Update(User user);
    }
}