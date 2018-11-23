using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentsRecruitmentWebApi.Data.Models
{
    public class CompletedHighSchoolForm
    {
        public string SelectedFormOfStudy { get; set; }
        public string SelectedDegreeOfStudy { get; set; }
        public string SelectedFieldOfStudy { get; set; }
        public string SelectedSpecialization { get; set; }
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
    }
}
