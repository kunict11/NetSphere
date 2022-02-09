using AutoMapper;
using server.DTO;
using server.Models;

namespace server.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<User, UserAuthDto>();
        }
    }
}