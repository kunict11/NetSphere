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
        public int LikesCount { get; set; } = 0;
        [JsonIgnore]
        public ICollection<PostLike> Likes { get; set; } = new List<PostLike>();
        public ICollection<PostComment> Comments { get; set; } = new List<PostComment>();
        public User User { get; set; }
        [JsonIgnore]
        // possibly not and ideal solution but it works kind of...
        public int? UserId { get; set; }
    }
}