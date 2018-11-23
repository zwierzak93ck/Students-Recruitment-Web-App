using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentsRecruitmentWebApi.Data.DAL;
using StudentsRecruitmentWebApi.Data.Models;
using StudentsRecruitmentWebApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudentsRecruitmentWebApi.Controllers
{
    [Route("api/[controller]")]
    public class UserController: Controller
    {
        public const string UserControllerUserId = "UserControllerUserId";

        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private  UserService _userService;
        private  StudentsRecruitmentContext _dbContext;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dbContext = new StudentsRecruitmentContext();
            _userService = new UserService();
        }

        [HttpPost, Route("users")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] User user)
        {
            var isUserExist = _dbContext.Users.Any(u => u.Login == user.Login);
            if(!isUserExist)
            {
                _userService.Register(_dbContext, user, user.Password);
                return Ok(true);
            }
            else
                return Ok(Json("User Already Exist"));
        }

        [HttpPost, Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> LogIn([FromBody] User user)
        {
            if(ModelState.IsValid)
            {
                var result = _userService.LogIn(_dbContext, user.Login, user.Password);


                if(result == null)
                {
                    return Ok(Json("Invalid email or password"));
                }
                else
                {
                    var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme, ClaimTypes.Name, ClaimTypes.Role);
                    identity.AddClaim(new Claim(ClaimTypes.Name, result.Login));
                    identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, result.Id));

                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity), new AuthenticationProperties { });
                    
                    return Ok(true);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpGet, Route("isAuthenticated")]
        public JsonResult IsAuthenticated()
        {
            return this.Json(HttpContext.User.Identity.IsAuthenticated);
        }

        [HttpGet, Route("logout")]
        public async void LogOut()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpGet, Route("name")]
        public JsonResult getUserName()
        {
            var name = HttpContext.User.Identity.Name;
            return this.Json(name);
        }

        [HttpGet, Route("type")]
        public Data.Models.Type? GetUserType()
        {
            string userId = HttpContext.User.Identity.IsAuthenticated ? _userManager.GetUserId(User) : null;

            User user = _dbContext.Users.SingleOrDefault(a => a.Id == userId);
            if (user != null)
            {
                Data.Models.Type userType = user.Type;

                return userType;
            }

            return null;
        }
    }
}
