using Microsoft.EntityFrameworkCore;
using StudentsRecruitmentWebApi.Data.Models;

namespace StudentsRecruitmentWebApi.Data.DAL
{
    public class StudentsRecruitmentContext : DbContext
    {
        public StudentsRecruitmentContext() { }

        public DbSet<User> Users { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<CompletedHighSchoolInformation> CompletedHighSchoolInformations { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<CompletedStudiesInformation> CompletedStudiesInformations { get; set; }
        public DbSet<SelectedStudies> SelectedStudies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Candidate>()
                .HasOne(s => s.User)
                .WithOne(ad => ad.Candidate)
                .HasForeignKey<Candidate>(u => u.UserId)
                .HasConstraintName("FK_Candidates_Users_Id")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            modelBuilder.Entity<Candidate>()
              .HasOne(s => s.CompletedHighSchoolInformation)
              .WithOne(ad => ad.Candidate)
              .HasForeignKey<Candidate>(ad => ad.CompletedHighSchoolInformationId)
              .HasConstraintName("FK_Candidates_CompletedHighSchoolInformations_Id");
            
            modelBuilder.Entity<Candidate>()
                .HasOne(s => s.Address)
                .WithOne(ad => ad.Candidate)
                .HasForeignKey<Candidate>(s => s.AddressId)
                .HasConstraintName("FK_Candidates_Addresses_Id");

            modelBuilder.Entity<Candidate>()
                .HasOne(s => s.CompletedStudiesInformation)
                .WithOne(ad => ad.Candidate)
                .HasForeignKey<Candidate>(ad => ad.CompletedStudiesInformationId)
                .HasConstraintName("FK_Candidates_CompletedStudiesInformations_Id");

            modelBuilder.Entity<Candidate>()
                .HasOne<Group>(s => s.Group)
                .WithMany(ad => ad.Candidates)
                .HasConstraintName("FK_Candidates_Groups_Id");

            modelBuilder.Entity<Candidate>()
                .HasOne(s => s.SelectedStudies)
                .WithOne(ad => ad.Candidate)
                .HasForeignKey<Candidate>(ad => ad.SelectedStudiesId)
                .HasConstraintName("FK_Candidates_SelectedStudies_Id");

            modelBuilder.Entity<Candidate>()
                .Property(p => p.Image)
                .HasColumnType("blob");

            modelBuilder.Entity<User>()
                .Property(p => p.PasswordSalt)
                .HasColumnType("varbinary(16)");

            modelBuilder.Entity<Candidate>()
                .Property(p => p.SecondName)
                .IsRequired(false);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(
                "server=127.0.0.1; " +
                "database=StudentsRecruitmentDb; " +
                "user=d.zwierzchowski; " +
                "password=Damian123; " +
                "SslMode=none"
                );
        }
    }
}
