using StudentsRecruitmentWebApi.Data.DAL;
using StudentsRecruitmentWebApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentsRecruitmentWebApi.Services
{
    public class StudyService
    {

        public CompletedHighSchoolInformation AddFirstDegree (StudentsRecruitmentContext dbContext, CompletedHighSchoolForm completedHighSchoolInformationForm, string userId)
        {
            Candidate candidate = dbContext.Candidates.SingleOrDefault(a => a.UserId == userId);

            SelectedStudies selectedStudies = new SelectedStudies
            {
                SelectedFormOfStudy = completedHighSchoolInformationForm.SelectedFormOfStudy,
                SelectedDegreeOfStudy = "Pierwszy",
                SelectedFieldOfStudy = completedHighSchoolInformationForm.SelectedFieldOfStudy,
                SelectedSpecialization = completedHighSchoolInformationForm.SelectedSpecialization
            };
            dbContext.SelectedStudies.Add(selectedStudies);
            dbContext.SaveChanges();

            CompletedHighSchoolInformation completedHighSchoolInformation = new CompletedHighSchoolInformation
            {
                CommissionHeadquarters = completedHighSchoolInformationForm.CommissionHeadquarters,
                HighSchoolHeadguarters = completedHighSchoolInformationForm.HighSchoolHeadguarters,
                HighSchoolName = completedHighSchoolInformationForm.HighSchoolName,
                MaturityCertificateNumber = completedHighSchoolInformationForm.MaturityCertificateNumber,
                HighSchoolGraduationYear = completedHighSchoolInformationForm.HighSchoolGraduationYear,
                MathGrade = completedHighSchoolInformationForm.MathGrade,
                ForeignLanguageGrade = completedHighSchoolInformationForm.ForeignLanguageGrade,
                PolishLanguageGrade = completedHighSchoolInformationForm.PolishLanguageGrade,
                SelectedSubjectGrade = completedHighSchoolInformationForm.SelectedSubjectGrade,
                SelectedSubject = completedHighSchoolInformationForm.SelectedSubject
            };
            dbContext.CompletedHighSchoolInformations.Add(completedHighSchoolInformation);
            dbContext.SaveChanges();

            candidate.SelectedStudiesId = selectedStudies.Id;
            candidate.CompletedHighSchoolInformationId = completedHighSchoolInformation.Id;

            dbContext.SaveChanges();

            return completedHighSchoolInformation;
        }

        public CompletedStudiesInformation AddSecondDegree (StudentsRecruitmentContext dbContext, CompletedStudiesForm completedStudiesInformationForm, string userId)
        {
            Candidate candidate = dbContext.Candidates.SingleOrDefault(a => a.UserId == userId);

            SelectedStudies selectedStudies = new SelectedStudies
            {
                SelectedFormOfStudy = completedStudiesInformationForm.SelectedFormOfStudy,
                SelectedDegreeOfStudy = "Drugi",
                SelectedFieldOfStudy = completedStudiesInformationForm.SelectedFieldOfStudy,
                SelectedSpecialization = completedStudiesInformationForm.SelectedSpecialization
            };
            dbContext.SelectedStudies.Add(selectedStudies);
            dbContext.SaveChanges();

            CompletedStudiesInformation completedStudiesInformation = new CompletedStudiesInformation
            {
                CompletedStudyField = completedStudiesInformationForm.CompletedStudyField,
                CompletedStudySpecialization = completedStudiesInformationForm.CompletedStudySpecialization,
                DiplomaNumber = completedStudiesInformationForm.DiplomaNumber,
                UniversityFullName = completedStudiesInformationForm.UniversityFullName,
                UniversityHeadquarters = completedStudiesInformationForm.UniversityHeadquarters,
                UniversityGraduationYear = completedStudiesInformationForm.UniversityGraduationYear,
                ObtainedTitle = completedStudiesInformationForm.ObtainedTitle,
                DiplomaGrade = completedStudiesInformationForm.DiplomaGrade,
                ForeignLanguageGrade = completedStudiesInformationForm.ForeignLanguageGrade
                
            };
            dbContext.CompletedStudiesInformations.Add(completedStudiesInformation);
            dbContext.SaveChanges();

            candidate.SelectedStudiesId = selectedStudies.Id;
            candidate.CompletedStudiesInformationId = completedStudiesInformation.Id;

            dbContext.SaveChanges();

            return completedStudiesInformation;
        }
    }
}
