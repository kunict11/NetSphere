using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Interfaces;
using server.Models;
using System;

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
        // TODO: return DTO instead
        public async Task<ActionResult<UserDto>> GetUser(string username) 
        {
            User user = await _userRepo.GetUserByUsernameAsync(username);
            
            return _mapper.Map<UserDto>(user);
        }
    }
}