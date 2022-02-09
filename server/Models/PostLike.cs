using System.Text.Json.Serialization;

namespace server.Models
{
    public class PostLike
    {
        public int PostId { get; set; }
        [JsonIgnore]
        public Post Post { get; set; }

        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }
}