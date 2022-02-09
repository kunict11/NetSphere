using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Interfaces;
using server.Models;
using System;
using System.Security.Claims;
using server.Helpers;

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
        public async Task<ActionResult<ResponseInfo>> ConnectWithUser([FromBody] User user)
        {
            User u = await _userRepo.GetUserByUsernameAsync(user.Username);
            if(u == null)
            {
                var notfound = new ResponseInfo {
                    Message = "User with given username doesn't exist.",
                    StatusCode = 404
                };
                return NotFound(notfound);
            }

            string currentUserUsername = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User currentUser = await _userRepo.GetUserByUsernameAsync(currentUserUsername);

            currentUser.Connections.Add(u);
            _userRepo.Update(currentUser);

            if(await _userRepo.SaveAllAsync()) 
            {
                var res = new ResponseInfo {
                    Message = $"You have successfully connected with {user.Username}",
                    StatusCode = 201
                };
                return Ok(res);
            }
                var errorResponse = new ResponseInfo {
                    Message = $"An error occured while attempting to connect with {user.Username}",
                    StatusCode = 500
                };

            return BadRequest(errorResponse);
        }
    }
}