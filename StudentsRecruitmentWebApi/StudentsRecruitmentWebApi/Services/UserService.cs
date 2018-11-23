using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using StudentsRecruitmentWebApi.Data.Models;
using StudentsRecruitmentWebApi.Data.DAL;
using System.Linq;

using StudentsRecruitmentWebApi.Services;
using System.IO;

namespace StudentsRecruitmentWebApi.Services
{
    public class UserService
    {
        
        public User Register(StudentsRecruitmentContext dbContext, User user, string password)
        {
            string passwordHash;
            byte[] passwordSalt;
            GeneratePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            return user;
        }

        public User LogIn (StudentsRecruitmentContext dbContext, string login, string password)
        {
            
            var user = dbContext.Users.SingleOrDefault(u => u.Login == login);

            return (user == null) ? null :
                !CheckPasswordHash(password, user.PasswordHash, user.PasswordSalt) ? null :
                    user;
        }

        private static void GeneratePasswordHash(string password, out string passwordHash, out byte[] passwordSalt)
        {
            
            passwordSalt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(passwordSalt);
            }

            passwordHash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: passwordSalt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8)
            );
        }

        private static bool CheckPasswordHash(string password, string storedPasswordHash, byte[] storedPasswordSalt)
        {
            byte[] passwordSalt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(passwordSalt);
            }

            string computedPasswordHash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: storedPasswordSalt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8)
            );

            return (storedPasswordHash != computedPasswordHash) ? false : true;
        }
    }
}
