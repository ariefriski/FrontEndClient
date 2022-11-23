using BelajarWeb1.Context;
using BelajarWeb1.Handler;
using BelajarWeb1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Plugins;
using System.Runtime.CompilerServices;

namespace BelajarWeb1.Controllers
{
    public class AccountController : Controller
    {
        MyContext myContext;

        public AccountController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        public IActionResult Index(LoginResponse loginResponse)
        {
            if (loginResponse.FullName != null)
            {
                return View(loginResponse);
            }
            else {
                return RedirectToAction("Login", "Account");
            }
                
            
        }

        public IActionResult Register()
        {
            return View();
        }

        public IActionResult Buat()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Register(string fullname, string email, string birthdate, string password)
        {
            //var data = myContext.Users.Include(x => x.employee).Include(x => x.role)
            //    .SingleOrDefault(x => x.employee.Email == email);

            if (myContext.Employees.Any(x=>x.Email==email))
            {
                return View();
            }
            Employee employee = new Employee()
            {
                Fullname = fullname,
                Email = email,
                BirthDate = birthdate
            };
    
           myContext.Employees.Add(employee);
            var save = myContext.SaveChanges();

            if (save > 0)
            {
                var id = myContext.Employees.SingleOrDefault(x => x.Email.Equals(email)).Id;
                User user = new User()
                {
                    employeeId = id,
                    Password = Hashing.HashPassword(password),
                    roleId = 1
                };

                myContext.Add(user);
                var result = myContext.SaveChanges();

                if (result > 1)
                    return RedirectToAction("Login", "Account");

            }
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public IActionResult Login(LoginResponse login,string Password)
        //{
        //    var data = myContext.Users.Include(x => x.employee).Include(x=>x.role)
        //        .SingleOrDefault(x => x.employee.Email==login.Email);
        //    var vPass = Hashing.ValidatePassword(Password, data.Password);
        //    if (data !=null && vPass == true)
        //    {


        //        LoginResponse loginResponse = new LoginResponse()
        //        {
        //            FullName = data.employee.Fullname,
        //            Email = data.employee.Email,
        //            Role = data.role.Name
        //        };
        //        HttpContext.Session.SetInt32("Id", data.Id);
        //        HttpContext.Session.SetString("Fullname", data.employee.Fullname);
        //        HttpContext.Session.SetString("Email", data.employee.Email);
        //        HttpContext.Session.SetString("Role", data.role.Name);



        //        return RedirectToAction("Index", "Account",loginResponse);
        //    }
        //    else
        //    {
        //        return RedirectToAction("Login", "Account");
        //    }
        //    return View();
        //}

        public IActionResult ResetPassword()
        {
            return View();
        }


        [HttpPost]
        public IActionResult ResetPassword(string fullName, string email, string birthDate)
        {
            var data = myContext.Users
                          .Include(x => x.employee)
                          .SingleOrDefault(x => x.employee.Email.Equals(email) && x.employee.Fullname.Equals(fullName) && x.employee.BirthDate.Equals(birthDate));

            if (data != null)
            {
                Employee employee = new Employee()
                {
                    Fullname = fullName,
                    Email = email,
                    BirthDate = birthDate
                };

                return RedirectToAction("NewPassword", "Account",employee);
            }


            return View();
        }


        public IActionResult NewPassword(Employee employee)
        {
       
            return View(employee);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult NewPassword( string password,string email)
        {
            var data = myContext.Users.Include(x => x.employee).SingleOrDefault(x => x.employee.Email.Equals(email));
            if (data != null)
            {
                data.Password = Hashing.HashPassword(password);
                myContext.Entry(data).State = EntityState.Modified;
                var result = myContext.SaveChanges();
                if (result > 0)
                    return RedirectToAction("Login", "Account");
            }

            return View();
        }

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public IActionResult ResetPassword(string fullName, string email, string birthDate, string newPassword)
        //{
        //    var data = myContext.Users
        //                  .Include(x => x.employee)
        //                  .SingleOrDefault(x => x.employee.Email
        //                  .Equals(email) && x.employee.Fullname.Equals(fullName) && x.employee.BirthDate.Equals(birthDate));

        //    if (data != null)
        //    {


        //        User user = new User()
        //        {
        //            Password = newPassword
        //        };

        //        data.Password = user.Password;
        //        myContext.Entry(data).State = EntityState.Modified;
        //        myContext.SaveChanges();


        //        return RedirectToAction("Login", "Account");
        //    }


        //    return View();
        //}

        public IActionResult ChangePassword()
        {
            return View();
        }


        [HttpPost]
        public IActionResult ChangePassword(string OldPassword, User user, string email)
        {
           // var hPass = Hashing.HashPassword(OldPassword);
            var data = myContext.Users.Include(x=>x.employee).FirstOrDefault(x => x.employee.Email.Equals(email));
            var vPass = Hashing.ValidatePassword(OldPassword, data.Password);
            if (data != null && vPass == true)
            {
               
                    data.Password = Hashing.HashPassword(user.Password);
                    myContext.Entry(data).State = EntityState.Modified;
                    var result = myContext.SaveChanges();
                    if (result > 0)
                        return RedirectToAction("Login");
                
            }

            return View();
        }









    }
}
