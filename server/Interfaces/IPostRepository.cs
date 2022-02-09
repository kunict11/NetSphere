using System.Collections.Generic;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IPostRepository
    {
        Task<Post> GetPostByIdAsync(int id);
        Task<bool> SaveAllAsync();
        void Update(Post post);
    }
}