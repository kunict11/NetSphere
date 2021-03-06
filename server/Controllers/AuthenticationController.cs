using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Interfaces;
using server.Models;
using System.Text;
using System.Security.Cryptography;
using server.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using AutoMapper;

namespace server.Controllers
{
    public class AuthenticationController : BaseAPIController
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepo;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthenticationController(DataContext context, IUserRepository userRepo, ITokenService tokenService, IMapper mapper)
        {
            _context = context;
            _userRepo = userRepo;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserAuthDto>> Register(RegisterDto regDto)
        {
            if(await UserExists(regDto.Username))
                return BadRequest("This username is already taken.");

            HMACSHA512 hmac = new HMACSHA512();

            User newUser = new User
            {
                Username = regDto.Username,
                PasswordSalt = hmac.Key,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(regDto.Password))
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            UserAuthDto userAuth = _mapper.Map<UserAuthDto>(newUser);
            userAuth.Token = _tokenService.GenerateToken(newUser);

            return userAuth;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserAuthDto>> Login(LoginDto loginDto)
        {
            User userDB = await _userRepo.GetUserByUsernameAsync(loginDto.Username);
            if(userDB == null)
            {
                return Unauthorized("Wrong username.");
            }

            HMACSHA512 hmac = new HMACSHA512(userDB.PasswordSalt);

            byte[] passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            
            if(!HashEquals(userDB.PasswordHash, passwordHash))
                return Unauthorized("Wrong password.");

            UserAuthDto userAuth = _mapper.Map<UserAuthDto>(userDB);
            userAuth.Token = _tokenService.GenerateToken(userDB);

            return userAuth;
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(user => user.Username == username);
        }

        private bool HashEquals(byte[] h1, byte[] h2)
        {
            for(int i = 0;i < h1.Length; i++)
            {
                if(h1[i] != h2[i])
                    return false;
            }

            return true;
        }
    }
}