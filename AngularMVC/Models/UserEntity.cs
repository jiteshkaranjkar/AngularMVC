using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVC.Models
{
    public class UserEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Gender { get; set; }
        public DateTime DOB { get; set; }
        public string EmailId { get; set; }
    }
}