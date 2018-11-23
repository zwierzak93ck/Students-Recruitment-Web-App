using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentsRecruitmentWebApi.Data.Models
{
    public class SelectedStudies
    {
        public int Id { get; set; }
        public string SelectedFormOfStudy { get; set; }
        public string SelectedDegreeOfStudy { get; set; }
        public string SelectedFieldOfStudy { get; set; }
        public string SelectedSpecialization { get; set; }

        public virtual Candidate Candidate { get; set; }
    }
}
