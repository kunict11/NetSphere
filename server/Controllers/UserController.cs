using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    public class UserController : BaseAPIController
    {
        private readonly IUserRepository _userRepo;

        public UserController(IUserRepository userRepo) 
        {
            _userRepo = userRepo;
        }

        [HttpGet("{username}")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> GetUser(string username) 
        {
            User user = await _userRepo.GetUserByUsernameAsync(username);
            return new UserDto
            {
                Username = user.Username
            };
        }
    }
}