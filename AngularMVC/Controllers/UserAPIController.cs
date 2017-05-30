using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AngularMVC.DBContext;
using AngularMVC.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace AngularMVC.Controllers
{
    public class UserAPIController : ApiController
    {
        private IUserService userService;

        public UserAPIController()
        {
            this.userService = new UserService();
        }

        // GET: api/UserAPI
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return userService.GetAll();
        }

        // GET: api/UserAPI/5
        [HttpGet]
        //[ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            var user = userService.GetById(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/UserAPI/5
        [HttpPut]
        //[ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
            user.Id = id;
            try
            {
                // save 
                userService.Update(user, user.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/UserAPI/5
        [HttpDelete]
        //[ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            userService.Delete(id);

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
            }
            base.Dispose(disposing);
        }

        // POST: api/UserAPI
        [AllowAnonymous]
        [HttpPost]
        [ActionName("register")]
        [ResponseType(typeof(User))]
        public IHttpActionResult Register(DBContext.User user)
        {
            try
            {
                userService.Create(user, user.Password);
                return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
                //return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }
        public class AuthenticateUser
        {
            public string UserName { get; set; }
            public string UserPwd { get; set; }
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("authentication")]
        [ResponseType(typeof(User))]
        public IHttpActionResult Authentication(AuthenticateUser loginUser)
        {
            var user = userService.Authenticate(loginUser.UserName, loginUser.UserPwd);

            if (user == null)
                return Unauthorized();

            //var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.ASCII.GetBytes("123");
            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Subject = new ClaimsIdentity(new Claim[]
            //    {
            //        new Claim(ClaimTypes.Name, user.Id.ToString())
            //    }),
            //    Expires = DateTime.UtcNow.AddDays(7),
            //    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            //};
            //var token = tokenHandler.CreateToken(tokenDescriptor);
            //var tokenString = tokenHandler.WriteToken(token);

            //// return basic user info (without password) and token to store client side
            ////return Ok(new
            ////{
            ////    Id = user.Id,
            ////    Username = user.Username,
            ////    FirstName = user.FirstName,
            ////    LastName = user.LastName,
            ////    Token = tokenString
            ////});
            return Ok(user);
        }
    }
}