﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Microsoft.EntityFrameworkCore;

namespace StudentsRecruitmentWebApi.Data.Models
{
    public class CompletedStudiesForm
    {
        public string SelectedFormOfStudy { get; set; }
        public string SelectedDegreeOfStudy { get; set; }
        public string SelectedFieldOfStudy { get; set; }
        public string SelectedSpecialization { get; set; }
        public string UniversityFullName { get; set; }
        public string UniversityHeadquarters { get; set; }
        public int UniversityGraduationYear { get; set; }
        public string DiplomaNumber { get; set; }
        public float DiplomaGrade { get; set; }
        public string ObtainedTitle { get; set; }
        public string CompletedStudyField { get; set; }
        public string CompletedStudySpecialization { get; set; }
        public float ForeignLanguageGrade { get; set; }
    }
}
