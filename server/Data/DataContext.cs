using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }
            
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PostLike>().HasKey(pl => new { pl.PostId, pl.UserId });
            modelBuilder.Entity<PostComment>().HasKey(pc => new { pc.PostId, pc.UserId });
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
    }
}