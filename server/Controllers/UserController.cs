using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Interfaces;
using server.Models;
using System;
using System.Security.Claims;

namespace server.Controllers
{
    public class UserController : BaseAPIController
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepo, IMapper mapper) 
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [HttpGet("{username}")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> GetUser(string username) 
        {
            User user = await _userRepo.GetUserByUsernameAsync(username);
            
            return _mapper.Map<UserDto>(user);
        }

        [HttpPatch("connect")]
        [Authorize]
        public async Task<ActionResult> ConnectWithUser(string username)
        {
            User user = await _userRepo.GetUserByUsernameAsync(username);
            if(user == null)
            {
                return NotFound("User with given username doesn't exist.");
            }

            string currentUserUsername = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User currentUser = await _userRepo.GetUserByUsernameAsync(currentUserUsername);

            currentUser.Connections.Add(user);
            _userRepo.Update(currentUser);

            if(await _userRepo.SaveAllAsync())
                return Ok($"You have successfully connected with {user.Username}");

            return BadRequest($"An error occured while attempting to connect with {user.Username}");
        }
    }
}