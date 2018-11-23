using System;
using StudentsRecruitmentWebApi.Data.Models;
using StudentsRecruitmentWebApi.Data.DAL;
using System.Linq;
using System.IO;
using System.Collections.Generic;
using System.Collections;
using System.Drawing;

namespace StudentsRecruitmentWebApi.Services
{
    public class CandidateService
    {
        public Boolean IsCandidateExist(StudentsRecruitmentContext dbContext, string userId)
        {
            var candidate = dbContext.Candidates.SingleOrDefault(a => a.UserId == userId);

            bool result = candidate != null ? true : false;
            return result;
            
        }

        public Candidate AddCandidate(StudentsRecruitmentContext dbContext, StudentRecruitmentForm studentRecruitmentForm, string userId)
        {
            var address = new Address
            {
                ApartmentNumber = studentRecruitmentForm.ApartmentNumber,
                City = studentRecruitmentForm.City,
                Country = studentRecruitmentForm.Country,
                HouseNumber = studentRecruitmentForm.HouseNumber,
                PostalCode = studentRecruitmentForm.PostalCode,
                PostOffice = studentRecruitmentForm.PostOffice,
                Street = studentRecruitmentForm.Street,
                TypeOfTown = studentRecruitmentForm.TypeOfTown,
                Voivodeship = studentRecruitmentForm.Voivodeship
            };
            dbContext.Addresses.Add(address);

            dbContext.SaveChanges();

            var addressId = address.Id;

            Candidate candidate = new Candidate
            {
                Status = Status.DURINGRECRUITMENT,
                isRecruitmentPaid = false,
                FirstName = studentRecruitmentForm.FirstName,
                SecondName = studentRecruitmentForm.SecondName,
                LastName = studentRecruitmentForm.LastName,
                FamilyName = studentRecruitmentForm.FamilyName,
                Gender = studentRecruitmentForm.Gender,
                Nationality = studentRecruitmentForm.Gender,
                BirthDate = studentRecruitmentForm.BirthDate,
                FatherName = studentRecruitmentForm.FatherName,
                MotherName = studentRecruitmentForm.MotherName,
                Pesel = studentRecruitmentForm.Pesel,
                UserId = userId,
                AddressId = addressId
            };
            dbContext.Candidates.Add(candidate);

            dbContext.SaveChanges();

            return candidate;
        }

        public IList GetAllDuringRecruitmentCandidates(StudentsRecruitmentContext dbContext)
        {
            var candidates = dbContext.Candidates.
                Join(dbContext.SelectedStudies, a => a.SelectedStudiesId, b => b.Id, (a,b) => new { a, b}).
                Where(m => m.a.Status == Status.DURINGRECRUITMENT && m.a.Image != null && m.a.SelectedStudiesId != null).
                Select(c => new {
                    c.a.CandidateId,
                    c.a.FirstName,
                    c.a.LastName,
                    c.a.isRecruitmentPaid,
                    c.b.SelectedDegreeOfStudy,
                    c.b.SelectedFormOfStudy,
                    c.b.SelectedFieldOfStudy,
                    c.b.SelectedSpecialization,

                    ScoreFirst = dbContext.CompletedHighSchoolInformations.
                    Where(m => m.Id == c.a.CompletedHighSchoolInformationId && c.a.CompletedHighSchoolInformationId != null).
                    Select(d => new
                    {
                        Score = ((0.2 * d.PolishLanguageGrade) + (0.1 * d.ForeignLanguageGrade) + d.MathGrade + (1.5 * d.SelectedSubjectGrade)) * 10
                    }).ToArray(),

                    ScoreSecond = dbContext.CompletedStudiesInformations.
                    Where(m => m.Id == c.a.CompletedStudiesInformationId && c.a.CompletedStudiesInformationId != null).
                    Select(d => new
                    {
                        Score = ((0.1 * d.ForeignLanguageGrade) + (1.5 * d.DiplomaGrade)) * 10 
                    }).ToArray()
                }).ToList();

            return candidates;
        }

        public IList GetAllAcceptedCandidates(StudentsRecruitmentContext dbContext)
        {
            var result = dbContext.Candidates.
                Join(dbContext.SelectedStudies, candidate => candidate.SelectedStudiesId, selectedStudies => selectedStudies.Id, (candidate, selectedStudies) =>
                new { candidate, selectedStudies }).
                Where(candidateSelectedStudies => candidateSelectedStudies.candidate.Status == Status.ACCEPTED).
        Select(data => new
        {
            data.candidate.CandidateId,
            data.candidate.FirstName,
            data.candidate.LastName,
            data.selectedStudies.SelectedDegreeOfStudy,
            data.selectedStudies.SelectedFormOfStudy,
            data.selectedStudies.SelectedFieldOfStudy,
            data.selectedStudies.SelectedSpecialization,

            ScoreFirst = dbContext.CompletedHighSchoolInformations.
                    Where(m => m.Id == data.candidate.CompletedHighSchoolInformationId && data.candidate.CompletedHighSchoolInformationId != null).
                    Select(d => new
                    {
                        Score = ((0.2 * d.PolishLanguageGrade) + (0.1 * d.ForeignLanguageGrade) + d.MathGrade + (1.5 * d.SelectedSubjectGrade)) * 10
                    }).ToArray(),

            ScoreSecond = dbContext.CompletedStudiesInformations.
                    Where(m => m.Id == data.candidate.CompletedStudiesInformationId && data.candidate.CompletedStudiesInformationId != null).
                    Select(d => new
                    {
                        Score = ((0.1 * d.ForeignLanguageGrade) + (1.5 * d.DiplomaGrade)) * 10
                    }).ToArray(),

            GroupName = dbContext.Groups.
                Where(group => group.Id == data.candidate.GroupId).
                Select(groupName => groupName.GroupName),
                
            Groups = dbContext.Groups.
                        GroupJoin(dbContext.SelectedStudies, group => group.Field, candidateWithoutGroup => candidateWithoutGroup.SelectedFieldOfStudy, (group, candidateWithoutGroup) => new { group, candidateWithoutGroup}).
                        Where(groups => data.selectedStudies.SelectedFormOfStudy == groups.group.Form && 
                                        data.selectedStudies.SelectedDegreeOfStudy == groups.group.Degree && 
                                        data.selectedStudies.SelectedFieldOfStudy == groups.group.Field && 
                                        data.selectedStudies.SelectedSpecialization == groups.group.Specialization &&
                                        data.candidate.GroupId == null &&
                                        dbContext.Groups.Count(a => a.Id == data.candidate.GroupId) < 30).
                        Select(groupList => new
                        {
                            groupList.group.GroupName,
                        }).ToArray() 
        }).ToList();
            return result;
        }

        public IList GetAllRejectedCandidates(StudentsRecruitmentContext dbContext)
        {
            var candidates = dbContext.Candidates.
                Join(dbContext.SelectedStudies, a => a.SelectedStudiesId, b => b.Id, (a, b) => new { a, b }).
                Where(m => m.a.Status == Status.REJECTED && m.a.SelectedStudiesId == m.b.Id).
                Select(c => new {
                    c.a.CandidateId,
                    c.a.FirstName,
                    c.a.LastName,
                    c.a.isRecruitmentPaid,
                    c.b.SelectedDegreeOfStudy,
                    c.b.SelectedFormOfStudy,
                    c.b.SelectedFieldOfStudy,
                    c.b.SelectedSpecialization,
                    ScoreFirst = dbContext.CompletedHighSchoolInformations.
                    Where(m => m.Id == c.a.CompletedHighSchoolInformationId && c.a.CompletedHighSchoolInformationId != null).
                    Select(d => new
                    {
                        Score = ((0.2 * d.PolishLanguageGrade) + (0.1 * d.ForeignLanguageGrade) + d.MathGrade + (1.5 * d.SelectedSubjectGrade)) * 10
                    }).ToArray(),

                    ScoreSecond = dbContext.CompletedStudiesInformations.
                    Where(m => m.Id == c.a.CompletedStudiesInformationId && c.a.CompletedStudiesInformationId != null).
                    Select(d => new
                    {
                        Score = ((0.1 * d.ForeignLanguageGrade) + (1.5 * d.DiplomaGrade)) * 10
                    }).ToArray(),
                }).ToList();

            return candidates;
        }

        public Boolean ChangeStatus(StudentsRecruitmentContext dbContext, int candidateId, string newStatus)
        {
            var candidate = dbContext.Candidates.FirstOrDefault(a => a.CandidateId == candidateId);
            if (newStatus == "accept")
            {
                candidate.Status = Status.ACCEPTED;
            }
            else
            {
                candidate.Status = Status.REJECTED;
            }


            dbContext.SaveChanges();

            return true;
        }

        public Boolean ConfirmPayment(StudentsRecruitmentContext dbContext, int candidateId)
        {
            var candidate = dbContext.Candidates.FirstOrDefault(a => a.CandidateId == candidateId);

            candidate.isRecruitmentPaid = true;

            dbContext.SaveChanges();
            return true;
        }

        public Boolean AddToGroup(StudentsRecruitmentContext dbContext, int candidateId, string groupName)
        {
            var candidate = dbContext.Candidates.FirstOrDefault(a => a.CandidateId == candidateId);

            int groupId = dbContext.Groups.Where(name => name.GroupName == groupName).Select(id => id.Id).Single();

            candidate.GroupId = groupId;

            dbContext.SaveChanges();

            return true;
        }

        public byte[] AddPhoto(StudentsRecruitmentContext dbContext, string userId, MemoryStream memoryStream)
        {

            Candidate candidate = dbContext.Candidates.SingleOrDefault(a => a.UserId == userId);
            if (candidate != null)
            {
                float len = memoryStream.Length;
                Image image = System.Drawing.Image.FromStream(memoryStream);
                float imageHeight = image.Height;
                float imageWidth = image.Width;
                if (imageWidth == 300 && imageHeight == 375)
                    return candidate.Image = memoryStream.ToArray();
            }
            return null;
        }
    }
}
