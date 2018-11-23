using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace StudentsRecruitmentWebApi.Data.Models
{
    public enum Type
    {
        CANDIDATE, RECRUITER
    }
    public class User: IdentityUser
    {

        public string Login { get; set; }
        public string Password { get; set; }
        public Type Type { get; set; }
        public byte[] PasswordSalt { get; set; }

        public Candidate Candidate { get; set; }
    }
}
