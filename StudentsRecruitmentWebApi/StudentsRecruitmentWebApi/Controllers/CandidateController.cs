using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentsRecruitmentWebApi.Data.DAL;
using StudentsRecruitmentWebApi.Data.Models;
using StudentsRecruitmentWebApi.Services;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudentsRecruitmentWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CandidateController : Controller
    {

        private readonly UserManager<User> _userManager;
        private CandidateService _candidateService;
        private StudentsRecruitmentContext _dbContext;

        public CandidateController(UserManager<User> userManager)
        {
            _userManager = userManager;
            _dbContext = new StudentsRecruitmentContext();
            _candidateService = new CandidateService();
        }
        

        [HttpPost, Route("candidates")]
        public IActionResult AddCandidate([FromBody] StudentRecruitmentForm candidateForm)
        {
            if(candidateForm == null)
            {
                return Unauthorized();
            }
            
           else {
                var userId = HttpContext.User.Identity.IsAuthenticated ? _userManager.GetUserId(User) : null;
                var candidate = _candidateService.AddCandidate(_dbContext, candidateForm, userId);

                if (candidate == null)
                    return Unauthorized();
                return Ok(Json("Candidate added"));
            }
        }

        [HttpGet, Route("exist")]
        public JsonResult IsExist()
        {
            return Json(_candidateService.IsCandidateExist(_dbContext, _userManager.GetUserId(User)));
        }

        [HttpPut, Route("candidates")]
        public IActionResult EditCandidate([FromBody] StudentRecruitmentForm studentRecruitmentForm)
        {
            var userId = HttpContext.User.Identity.IsAuthenticated ? _userManager.GetUserId(User) : null;

            if(studentRecruitmentForm == null)
            {
                return Unauthorized();
            }

            var candidate = _dbContext.Candidates.SingleOrDefault(a => a.UserId == userId);

            candidate.FirstName = studentRecruitmentForm.FirstName;
            candidate.SecondName = studentRecruitmentForm.SecondName;
            candidate.LastName = studentRecruitmentForm.LastName;
            candidate.Pesel = studentRecruitmentForm.Pesel;
            candidate.Nationality = studentRecruitmentForm.Nationality;
            candidate.BirthDate = studentRecruitmentForm.BirthDate;
            candidate.FatherName = studentRecruitmentForm.FatherName;
            candidate.MotherName = studentRecruitmentForm.MotherName;
            candidate.FamilyName = studentRecruitmentForm.FamilyName;
            candidate.Gender = studentRecruitmentForm.Gender;

            var address = _dbContext.Addresses.SingleOrDefault(a => a.Id == candidate.AddressId);

            address.Country = studentRecruitmentForm.Country;
            address.City = studentRecruitmentForm.City;
            address.Voivodeship = studentRecruitmentForm.Voivodeship;
            address.Street = studentRecruitmentForm.Street;
            address.PostalCode = studentRecruitmentForm.PostalCode;
            address.HouseNumber = studentRecruitmentForm.HouseNumber;
            address.ApartmentNumber = studentRecruitmentForm.ApartmentNumber;
            address.PostOffice = studentRecruitmentForm.PostOffice;
            address.TypeOfTown = studentRecruitmentForm.TypeOfTown;

            _dbContext.SaveChanges();

            return Ok("Data edited");
        }

        [HttpGet, Route("candidate")]
        public JsonResult GetCandidateData()
        {
            string userId = HttpContext.User.Identity.IsAuthenticated ? _userManager.GetUserId(User) : null;
            var candidate = _dbContext.Candidates.Where(a => a.UserId == userId).Select(a => new {
                firstName = a.FirstName,
                secondName = a.SecondName,
                lastName = a.LastName,
                pesel = a.Pesel,
                birthdate = a.BirthDate,
                nationality = a.Nationality,
                motherName = a.MotherName,
                fatherName = a.FatherName,
                familyName = a.FamilyName,
                gender = a.Gender,
                addressId = a.AddressId
            }).ToList();
            Candidate addressId = _dbContext.Candidates.FirstOrDefault();
            var address = _dbContext.Addresses.Where(a => a.Id == addressId.AddressId).Select(a => new {
                city = a.City,
                country =a.Country,
                street = a.Street,
                postOffice = a.PostOffice,
                postalCode = a.PostalCode,
                voivodeship = a.Voivodeship,
                houseNumber = a.HouseNumber,
                apartmentNumber = a.ApartmentNumber,
                typeOfTown = a.TypeOfTown
            }).ToList();
            var result = new { Candidate = candidate,  Address = address};

            return Json(result);
        }
        
        [HttpGet, Route("during")]
        public JsonResult GetAllDuringRecruitmentCandidates()
        {
            var candidates = _candidateService.GetAllDuringRecruitmentCandidates(_dbContext);

            return Json(candidates);
        }

        [HttpGet, Route("accepted")]
        public JsonResult GetAllAcceptedCandidates()
        {
            var candidates = _candidateService.GetAllAcceptedCandidates(_dbContext);

            return Json(candidates);
        }

        [HttpGet, Route("rejected")]
        public JsonResult GetAllRejectedCandidates()
        {
            var candidates = _candidateService.GetAllRejectedCandidates(_dbContext);

            return Json(candidates);
        }

        [HttpPost, Route("status")]
        public IActionResult ChangeStatus(int candidateId, string newStatus)
        {

            this._candidateService.ChangeStatus(_dbContext, candidateId, newStatus);
   
            return Ok();
        }

        [HttpGet, Route("payment")]
        public void ConfirmPayment(int candidateId)
        {
            this._candidateService.ConfirmPayment(_dbContext, candidateId);
        }


        [HttpGet, Route("group")]
        public IActionResult AddToGroup(int candidateId, string groupName)
        {
            this._candidateService.AddToGroup(_dbContext, candidateId, groupName);

            return Ok();
        }

        [HttpPut, Route("photo")]
        public async Task<IActionResult> AddPhoto(IFormFile candidatePhoto)
        {
            string userId = HttpContext.User.Identity.IsAuthenticated ? _userManager.GetUserId(User) : null;

            MemoryStream memoryStream = new MemoryStream();

            await candidatePhoto.CopyToAsync(memoryStream);



            byte[] isPhotoAdded = this._candidateService.AddPhoto(_dbContext, userId, memoryStream);
            if (isPhotoAdded != null)
            {
                _dbContext.SaveChanges();
                return Ok();
            }
            else
            {
                return Unauthorized();
            }

        }

        [HttpGet, Route("photo")]
        public async Task<IActionResult> GetPhoto()
        {
            string userId = HttpContext.User.Identity.IsAuthenticated ? _userManager.GetUserId(User) : null;
            Candidate candidate = _dbContext.Candidates.SingleOrDefault(a => a.UserId == userId);

            if (candidate != null)
            {
                return Ok(candidate.Image);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet, Route("status")]
        public IActionResult GetStatus()
        {
            string userId = HttpContext.User.Identity.IsAuthenticated ? _userManager.GetUserId(User) : null;
            StudentsRecruitmentContext _dbContext = new StudentsRecruitmentContext();

            Candidate candidate = _dbContext.Candidates.SingleOrDefault(a => a.UserId == userId);

            if (candidate != null)
            {
                return Ok(candidate.Status);
            }

            return Unauthorized();
        }
    }
}
