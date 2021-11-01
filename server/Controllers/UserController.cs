using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepo) 
        {
            _userRepo = userRepo;
        }

        [HttpGet("{username}")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> GetUser(string username) 
        {
            User user = await _userRepo.GetUserByUsernameAsync(username);
            return _mapper.Map<UserDto>(user);
        }
    }
}