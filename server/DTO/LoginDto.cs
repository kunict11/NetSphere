using System.ComponentModel.DataAnnotations;

namespace server.DTO
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}