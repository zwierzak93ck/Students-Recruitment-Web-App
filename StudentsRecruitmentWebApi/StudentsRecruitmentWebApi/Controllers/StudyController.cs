using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentsRecruitmentWebApi.Data.DAL;
using StudentsRecruitmentWebApi.Data.Models;
using StudentsRecruitmentWebApi.Services;
using System;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudentsRecruitmentWebApi.Controllers
{
    [Route("api/[controller]")]
    public class StudyController: Controller
    {
        private readonly UserManager<User> _userManager;
        private StudentsRecruitmentContext _dbContext;
        private StudyService _studyService;

        public StudyController(UserManager<User> userManager)
        {
            _userManager = userManager;
            _dbContext = new StudentsRecruitmentContext();
            _studyService = new StudyService();
        }

        [HttpPost, Route("firstDegree")]
        public IActionResult AddFirstDegree([FromBody] CompletedHighSchoolForm completedHighSchoolForm)
        {
            if (completedHighSchoolForm == null)
            {
                return Unauthorized();
            }

            else
            {
                var userId = HttpContext.User.Identity.IsAuthenticated ? _userManager.GetUserId(User) : null;
                var firstDegree = _studyService.AddFirstDegree(_dbContext, completedHighSchoolForm, userId);

                if (firstDegree == null)
                    return Unauthorized();
                return Ok(true);
            }
        }

        [HttpPost, Route("secondDegree")]
        public IActionResult AddSecondDegree([FromBody] CompletedStudiesForm completedStudiesForm)
        {
            if (completedStudiesForm == null)
            {
                return Unauthorized();
            }
            else
            {
                var userId = HttpContext.User.Identity.IsAuthenticated ? _userManager.GetUserId(User) : null;
                var secondDegree = _studyService.AddSecondDegree(_dbContext, completedStudiesForm, userId);

                if (secondDegree == null)
                    return Unauthorized();
                return Ok(true);
            }
        }
    }
}
