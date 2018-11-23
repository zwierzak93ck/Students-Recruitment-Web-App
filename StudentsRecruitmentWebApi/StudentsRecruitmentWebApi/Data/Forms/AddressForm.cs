using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Microsoft.EntityFrameworkCore;

namespace StudentsRecruitmentWebApi.Data.Models
{
    public class AddressForm
    {
        public string Country { get; set; }
        public string Voivodeship { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Street { get; set; }
        public int HouseNumber { get; set; }
        public int? ApartmentNumber { get; set; }
        public string PostOffice { get; set; }
        public string TypeOfTown { get; set; }
    }
}
