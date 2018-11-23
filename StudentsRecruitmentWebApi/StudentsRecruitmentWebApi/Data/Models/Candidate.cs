using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Microsoft.EntityFrameworkCore;

namespace StudentsRecruitmentWebApi.Data.Models
{

    public enum Status
    {
        ACCEPTED, REJECTED, DURINGRECRUITMENT
    }

    public class Candidate
    {
        public int CandidateId { get; set; }
        public virtual User User { get; set; }
        public string UserId { get; set; }

        public Status Status { get; set; }
        public Boolean isRecruitmentPaid { get; set; }
        public byte[] Image { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public string FamilyName { get; set; }
        public long Pesel { get; set; }
        public DateTime BirthDate { get; set; }
        public string Gender { get; set; }
        public string Nationality { get; set; }
        public string MotherName { get; set; }
        public string FatherName { get; set; }

        public virtual Address Address { get; set; }
        public int? AddressId { get; set; }

        public virtual CompletedHighSchoolInformation CompletedHighSchoolInformation { get; set; }
        public int? CompletedHighSchoolInformationId { get; set; }

        public virtual CompletedStudiesInformation CompletedStudiesInformation { get; set; }
        public int? CompletedStudiesInformationId { get; set; }

        public virtual SelectedStudies SelectedStudies { get; set; }
        public int? SelectedStudiesId { get; set; }

        public virtual Group Group { get; set; }
        public int? GroupId { get; set; } 
    }
}
