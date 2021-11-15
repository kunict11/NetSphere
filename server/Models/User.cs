using System.Collections.Generic;

namespace server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        // public string ProfilePicture { get; set; }
        public ICollection<User> Connections { get; set; } = new List<User>();
        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
}