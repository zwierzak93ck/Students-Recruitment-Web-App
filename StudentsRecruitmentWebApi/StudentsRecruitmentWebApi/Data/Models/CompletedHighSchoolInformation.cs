using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Microsoft.EntityFrameworkCore;

namespace StudentsRecruitmentWebApi.Data.Models
{
    public class CompletedHighSchoolInformation
    {
        public int Id { get; set; }
        public string HighSchoolName { get; set; }
        public string HighSchoolHeadguarters { get; set; }
        public string MaturityCertificateNumber { get; set; }
        public string CommissionHeadquarters { get; set; }
        public int HighSchoolGraduationYear { get; set; }
        public float MathGrade { get; set; }
        public float PolishLanguageGrade { get; set; }
        public float ForeignLanguageGrade { get; set; }
        public string SelectedSubject { get; set; }
        public float SelectedSubjectGrade { get; set; }

        public virtual Candidate Candidate { get; set; }
    }
}
