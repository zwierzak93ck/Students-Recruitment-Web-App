using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Microsoft.EntityFrameworkCore;

namespace StudentsRecruitmentWebApi.Data.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string GroupName { get; set; }
        public string Form { get; set; }
        public string Degree { get; set; }
        public string Faculty { get; set; }
        public string Field { get; set; }
        public string Specialization { get; set; }

        public ICollection<Candidate> Candidates { get; set; }
    }
}
