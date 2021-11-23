using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace server.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Text { get; set; }
        // public string Image { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
        public int Likes { get; set; } = 0;
        public ICollection<PostComment> Comments { get; set; } = new List<PostComment>();
        public User User { get; set; }
        [JsonIgnore]
        public int UserId { get; set; }
        public bool LikedByUser { get; set; } = false;
    }
}