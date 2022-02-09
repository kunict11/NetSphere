using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [Authorize]
    public class PostController : BaseAPIController
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepo;
        private readonly IPostRepository _postRepo;

        public PostController(DataContext context, IUserRepository userRepo, IPostRepository postRepo)
        {
            _context  = context;
            _userRepo = userRepo;
            _postRepo = postRepo;
        }

        [HttpPost]
        public async Task<ActionResult<Post>> NewPost([FromBody] Post p)
        {
            string username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await _userRepo.GetUserByUsernameAsync(username);

            Post post = new Post {
                Text = p.Text
            };
            user.Posts.Add(post);
            _userRepo.Update(user);

            if(await _userRepo.SaveAllAsync())
                return post;
            return BadRequest("An error occured while posting.");
        }

        [HttpGet]
        public async Task<ActionResult<List<Post>>> GetAllPosts()
        {
            string username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await _userRepo.GetUserByUsernameAsync(username);

            List<Post> posts = new List<Post>();

            posts.AddRange(user.Posts);
            posts.AddRange(AllConnectionPosts(user));

            return Ok(posts.OrderByDescending(p => p.Timestamp).ToList());
        }

        [HttpPatch("{like}")]
        public async Task<ActionResult> LikePost([FromBody] Post reqPost)
        {
            Post post = await _postRepo.GetPostByIdAsync(reqPost.Id);
            string username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await _userRepo.GetUserByUsernameAsync(username);

            if (post != null)
            {
                PostLike like = new PostLike() {
                    PostId = post.Id,
                    UserId = user.Id
                };
                post.Likes.Add(like);
                post.LikesCount += 1;
                _postRepo.Update(post);

                if(await _postRepo.SaveAllAsync())
                    return Ok("Success");
                else
                    return BadRequest("An error occured while attemting to like a post.");
            }

            return NotFound("Post with given id does not exist.");
        }

        [HttpGet("{liked}")]
        public async Task<ActionResult<ICollection<Post>>> GetAllLikedPosts()
        {
            string username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User user = await _userRepo.GetUserByUsernameAsync(username);
            List<Post> connPosts = AllConnectionPosts(user);
            Console.WriteLine(connPosts.ElementAt(0).Likes);
            var likedPosts = from post in connPosts
                             from like in post.Likes
                             where like.UserId == user.Id
                             select post;

            return Ok(likedPosts.ToList());
        }

        private List<Post> AllConnectionPosts(User user)
        {
            var posts = _context.Posts.Include(p => p.Likes).ToList();
            var conPosts = from p in posts
                           from con in user.Connections
                           where con.Id == p.UserId
                           select p;

            return conPosts.ToList();
        }
    }
}