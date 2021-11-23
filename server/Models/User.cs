using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        [JsonIgnore]
        public byte[] PasswordHash { get; set; }
        [JsonIgnore]
        public byte[] PasswordSalt { get; set; }
        // public string ProfilePicture { get; set; }
        [JsonIgnore]
        public ICollection<User> Connections { get; set; } = new List<User>();
        [JsonIgnore]
        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
}