using System;
using System.Collections.Generic;
using server.DTO;

namespace server.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Text { get; set; }
        // public string Image { get; set; }
        public DateTime Timestamp { get; set; }
        public ICollection<PostLike> Likes { get; set; }
        public ICollection<PostComment> Comments { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }
    }
}