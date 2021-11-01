namespace server.Models
{
    public class PostComment
    {
        public int PostId { get; set; }
        public Post Post { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public string Text { get; set; }
    }
}