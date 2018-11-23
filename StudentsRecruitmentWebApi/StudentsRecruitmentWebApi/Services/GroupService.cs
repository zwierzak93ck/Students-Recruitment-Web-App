using StudentsRecruitmentWebApi.Data.DAL;
using StudentsRecruitmentWebApi.Data.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentsRecruitmentWebApi.Services
{
    public class GroupService
    {
        public IList GetAllGroups(StudentsRecruitmentContext dbContext)
        {
            var groups = dbContext.Groups.Select(a => new
            {
                a.GroupName,
                a.Faculty,
                a.Form,
                a.Degree,
                a.Field,
                a.Specialization,
                Candidates = dbContext.Candidates.
                    Join(dbContext.Groups, candidate => candidate.GroupId, group => group.Id, (candidate, group) => new { candidate, group }).
                    Where(candidateGroup => a.Id == candidateGroup.candidate.GroupId).
                    Select(candidatesList => new
                    {
                        candidatesList.candidate.FirstName,
                        candidatesList.candidate.LastName
                    }).OrderBy(order => order.LastName).ThenBy(order => order.FirstName).ToList()
            }).ToList();

            return groups;
        }

        public int GetGroupNumber(StudentsRecruitmentContext dbContext, GroupForm groupForm)
        {
            Group group = dbContext.Groups.LastOrDefault(a => a.Form == groupForm.Form && a.Degree == groupForm.Degree && a.Faculty == groupForm.Faculty && a.Field == groupForm.Field && a.Specialization == groupForm.Specialization);
            if (group != null)
            {
                if (group.GroupName.Length == 5)
                {
                    string number = group.GroupName.Substring(4, 1);
                    return Convert.ToInt32(number);
                }

                else
                {
                    string number = group.GroupName.Substring(5, 1);
                    return Convert.ToInt32(number);
                }
                
            }

            else
                return 0;
            
        }

        public Group CreateGroup(StudentsRecruitmentContext dbContext, GroupForm groupForm)
        {
            string groupName = groupForm.Form + groupForm.Degree + groupForm.Faculty + groupForm.Field + groupForm.Specialization;
                
            switch (groupForm.Form)
            {
                case "S":
                    groupForm.Form = "Stacjonarne";
                    break;
                case "N":
                    groupForm.Form = "Niestacjonarne";
                    break;
            }

            switch (groupForm.Degree)
            {
                case "1":
                    groupForm.Degree = "Pierwszy";
                    break;
                case "2":
                    groupForm.Degree = "Drugi";
                    break;
            }

            switch (groupForm.Faculty)
            {
                case "A":
                    groupForm.Faculty = "Wydział Budownictwa i Architektury";
                    switch (groupForm.Field)
                    {
                        case "A":
                            groupForm.Field = "Architektura";
                            break;
                        case "B":
                            groupForm.Field = "Budownictwo";
                            switch (groupForm.Specialization)
                            {
                                case "K":
                                    groupForm.Specialization = "Konstrukcje Budowlane";
                                    break;
                                case "M":
                                    groupForm.Specialization = "Mosty";
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;

                case "B":
                    groupForm.Faculty = "Wydział Mechatroniki i Budowy Maszyn";
                    switch (groupForm.Field)
                    {
                        case "M":
                            groupForm.Field = "Mechanika i Budowa Maszyn";
                            switch (groupForm.Specialization)
                            {
                                case "E":
                                    groupForm.Specialization = "Eksploatacja Maszyn i Urządzeń Przemysłowych";
                                    break;
                                case "S":
                                    groupForm.Specialization = "Samochody i Ciągniki";
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "T":
                            groupForm.Field = "Transport";
                            switch (groupForm.Specialization)
                            {
                                case "L":
                                    groupForm.Specialization = "Logika i Spedycja";
                                    break;
                                case "T":
                                    groupForm.Specialization = "Transport Samochodowy";
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;

                case "C":
                    groupForm.Faculty = "Wydział Zarządzania i Modelowania Komputerowego";
                    switch (groupForm.Field)
                    {
                        case "E":
                            groupForm.Field = "Ekonomia";
                            switch (groupForm.Specialization)
                            {
                                case "E":
                                    groupForm.Specialization = "Ekonomia Menadżerska";
                                    break;
                                case "F":
                                    groupForm.Specialization = "Finanse Przedsiębiorstw";
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "Z":
                            groupForm.Field = "Zarządzanie i Inżynieria Produkcji";
                            switch (groupForm.Specialization)
                            {
                                case "I":
                                    groupForm.Specialization = "Inżynieria Produkcji";
                                    break;
                                case "Z":
                                    groupForm.Specialization = "Zarządzanie Łańcuchem Dostaw";
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;

                case "D":
                    groupForm.Faculty = "Wydział Elektrotechniki, Automatyki i Informatyki";
                    switch (groupForm.Field)
                    {
                        case "E":
                            groupForm.Field = "Elektrotechnika";
                            switch (groupForm.Specialization)
                            {
                                case "A":
                                    groupForm.Specialization = "Automatyka";
                                    break;
                                case "K":
                                    groupForm.Specialization = "Komputerowe Systemy Pomiarowe";
                                    break;
                                default:
                                    break;
                                        
                            }
                            break;
                        case "I":
                            groupForm.Field = "Informatyka";
                            switch (groupForm.Specialization)
                            {
                                case "S":
                                    groupForm.Specialization = "Systemy Informacyjne";
                                    break;
                                case "G":
                                    groupForm.Specialization = "Grafika Komputerowa";
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;

                case "E":
                    groupForm.Faculty = "Wydział Inżynierii Środowiska, Geomatykia i Energetyki";
                    switch (groupForm.Field)
                    {
                        case "G":
                            groupForm.Field = "Geodezja i Kartografia";
                            break;
                        case "I":
                            groupForm.Field = "Inzynieria Środowiska";
                            switch (groupForm.Specialization)
                            {
                                case "O":
                                    groupForm.Specialization = "Ogrzewnictwo i Wentylacja";
                                    break;
                                case "S":
                                    groupForm.Specialization = "Sieci i Instalacje Sanitarne";
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;

                default:
                    break;
            }

            int groupNumber = GetGroupNumber(dbContext, groupForm) + 1;
            
            Group group = new Group
            {
                GroupName = groupName + groupNumber,
                Form = groupForm.Form,
                Degree = groupForm.Degree,
                Faculty = groupForm.Faculty,
                Field = groupForm.Field,
                Specialization = groupForm.Specialization
            };

            dbContext.Groups.Add(group);
            dbContext.SaveChanges();

                return group;
        }
    }
}
