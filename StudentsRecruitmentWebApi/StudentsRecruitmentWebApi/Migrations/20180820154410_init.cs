using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace StudentsRecruitmentWebApi.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    ApartmentNumber = table.Column<int>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    HouseNumber = table.Column<int>(nullable: false),
                    PostOffice = table.Column<string>(nullable: true),
                    PostalCode = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    TypeOfTown = table.Column<string>(nullable: true),
                    Voivodeship = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompletedHighSchoolInformations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    CommissionHeadquarters = table.Column<string>(nullable: true),
                    ForeignLanguageGrade = table.Column<float>(nullable: false),
                    HighSchoolGraduationYear = table.Column<int>(nullable: false),
                    HighSchoolHeadguarters = table.Column<string>(nullable: true),
                    HighSchoolName = table.Column<string>(nullable: true),
                    MathGrade = table.Column<float>(nullable: false),
                    MaturityCertificateNumber = table.Column<string>(nullable: true),
                    PolishLanguageGrade = table.Column<float>(nullable: false),
                    SelectedSubject = table.Column<string>(nullable: true),
                    SelectedSubjectGrade = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompletedHighSchoolInformations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompletedStudiesInformations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    CompletedStudyField = table.Column<string>(nullable: true),
                    CompletedStudySpecialization = table.Column<string>(nullable: true),
                    DiplomaGrade = table.Column<float>(nullable: false),
                    DiplomaNumber = table.Column<string>(nullable: true),
                    ForeignLanguageGrade = table.Column<float>(nullable: false),
                    ObtainedTitle = table.Column<string>(nullable: true),
                    UniversityFullName = table.Column<string>(nullable: true),
                    UniversityGraduationYear = table.Column<int>(nullable: false),
                    UniversityHeadquarters = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompletedStudiesInformations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Degree = table.Column<string>(nullable: true),
                    Faculty = table.Column<string>(nullable: true),
                    Field = table.Column<string>(nullable: true),
                    Form = table.Column<string>(nullable: true),
                    GroupName = table.Column<string>(nullable: true),
                    Specialization = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SelectedStudies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    SelectedDegreeOfStudy = table.Column<string>(nullable: true),
                    SelectedFieldOfStudy = table.Column<string>(nullable: true),
                    SelectedFormOfStudy = table.Column<string>(nullable: true),
                    SelectedSpecialization = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SelectedStudies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    Login = table.Column<string>(nullable: true),
                    NormalizedEmail = table.Column<string>(nullable: true),
                    NormalizedUserName = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<string>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(16)", nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    SecurityStamp = table.Column<string>(nullable: true),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    UserName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Candidates",
                columns: table => new
                {
                    CandidateId = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    AddressId = table.Column<int>(nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    CompletedHighSchoolInformationId = table.Column<int>(nullable: true),
                    CompletedStudiesInformationId = table.Column<int>(nullable: true),
                    FamilyName = table.Column<string>(nullable: true),
                    FatherName = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    GroupId = table.Column<int>(nullable: true),
                    Image = table.Column<byte[]>(type: "blob", nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    MotherName = table.Column<string>(nullable: true),
                    Nationality = table.Column<string>(nullable: true),
                    Pesel = table.Column<long>(nullable: false),
                    SecondName = table.Column<string>(nullable: true),
                    SelectedStudiesId = table.Column<int>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    isRecruitmentPaid = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidates", x => x.CandidateId);
                    table.ForeignKey(
                        name: "FK_Candidates_Addresses_Id",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Candidates_CompletedHighSchoolInformations_Id",
                        column: x => x.CompletedHighSchoolInformationId,
                        principalTable: "CompletedHighSchoolInformations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Candidates_CompletedStudiesInformations_Id",
                        column: x => x.CompletedStudiesInformationId,
                        principalTable: "CompletedStudiesInformations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Candidates_Groups_Id",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Candidates_SelectedStudies_Id",
                        column: x => x.SelectedStudiesId,
                        principalTable: "SelectedStudies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Candidates_Users_Id",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Recruiters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    Faculty = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    IsAdmin = table.Column<bool>(nullable: false),
                    LastName = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    UserId1 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recruiters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recruiters_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_AddressId",
                table: "Candidates",
                column: "AddressId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_CompletedHighSchoolInformationId",
                table: "Candidates",
                column: "CompletedHighSchoolInformationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_CompletedStudiesInformationId",
                table: "Candidates",
                column: "CompletedStudiesInformationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_GroupId",
                table: "Candidates",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_SelectedStudiesId",
                table: "Candidates",
                column: "SelectedStudiesId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_UserId",
                table: "Candidates",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recruiters_UserId1",
                table: "Recruiters",
                column: "UserId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Candidates");

            migrationBuilder.DropTable(
                name: "Recruiters");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "CompletedHighSchoolInformations");

            migrationBuilder.DropTable(
                name: "CompletedStudiesInformations");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "SelectedStudies");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
