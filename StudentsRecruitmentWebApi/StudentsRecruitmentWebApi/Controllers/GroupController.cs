using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentsRecruitmentWebApi.Data.DAL;
using StudentsRecruitmentWebApi.Data.Models;
using StudentsRecruitmentWebApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudentsRecruitmentWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class GroupController : Controller
    {
        private readonly UserManager<User> _userManager;
        private GroupService _groupService;
        private StudentsRecruitmentContext _dbContext;

        public GroupController(UserManager<User> userManager)
        {
            _userManager = userManager;
            _dbContext = new StudentsRecruitmentContext();
            _groupService = new GroupService();
        }

        [HttpGet, Route("groups")]
        public JsonResult GetAllGroups()
        {
            var groups = _groupService.GetAllGroups(_dbContext);

            return Json(groups);
        }

        [HttpPost, Route("groups")]
        public IActionResult CreateGroup([FromBody] GroupForm groupForm)
        {
            if(groupForm == null)
            {
                return Unauthorized();
            }

            else
            {
                Group group = _groupService.CreateGroup(_dbContext, groupForm);

                if (group == null)
                    return Unauthorized();
                return Ok("New group added");
            }
        }

        [HttpGet, Route("name")]
        public IActionResult GetGroupName()
        {
            string userId = HttpContext.User.Identity.IsAuthenticated ? _userManager.GetUserId(User) : null;

            Candidate candidate = _dbContext.Candidates.SingleOrDefault(a => a.UserId == userId);

            if (candidate != null)
            {
                Group group = _dbContext.Groups.SingleOrDefault(g => g.Id == candidate.GroupId);
                if (group != null)
                {

                    return Ok(Json(group.GroupName));
                }
                return Unauthorized();
            }
            return Unauthorized();
        }

    }
}
