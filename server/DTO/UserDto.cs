using System.Collections.Generic;
using server.Models;

namespace server.DTO
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        // public string ProfilePicture { get; set; }
        public List<User> Connections { get; set; }
        public List<Post> Posts { get; set; }
    }
}