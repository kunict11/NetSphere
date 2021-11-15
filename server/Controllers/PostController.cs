using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [Authorize]
    public class PostController : BaseAPIController
    {
        private readonly IUserRepository _userRepo;

        public PostController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
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
    }
}