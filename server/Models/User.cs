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
        // public List<User> Followers { get; set; }
    }
}