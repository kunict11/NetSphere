using System.Threading.Tasks;
using server.Interfaces;
using server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace server.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context) 
        {
            _context = context;
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                                 .Include(u => u.Posts)
                                 .Include(u => u.Connections)
                                 .SingleOrDefaultAsync(user => user.Username == username);
        }

        public async Task<bool> SaveAllAsync()
        {
           return await _context.SaveChangesAsync() > 0;
        }

        public void Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<ICollection<Post>> GetAllLikedPosts(string username)
        {
            User user = await _context.Users.SingleOrDefaultAsync(user => user.Username == username);
            var likedPosts = from conn in user.Connections
                             from post in conn.Posts
                             where post.LikedByUser == true
                             select post;

            return likedPosts.ToList();
        }
    }
}