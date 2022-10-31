using BelajarWeb1.Context;
using BelajarWeb1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BelajarWeb1.Controllers
{
    public class UserController : Controller
    {
        MyContext myContext;

        public UserController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        public IActionResult Index()
        {
            var data = myContext.Users.ToList();
            return View(data);
        }

        public IActionResult Details(int id)
        {
            var data = myContext.Users.Where(x => x.Id == id).Include(y => y.role).FirstOrDefault();

            return View(data);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(User user)
        {

            myContext.Users.Add(user);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "Department");
            return View();
        }


        public IActionResult Edit(int id)
        {
            var data = myContext.Users.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, User user)
        {
            var data = myContext.Users.Find(id);
            if (data != null)
            {
                data.Password = user.Password;
                data.roleId = user.roleId;
                myContext.Entry(data).State = EntityState.Modified;
                var result = myContext.SaveChanges();
                if (result > 0)
                {
                    return RedirectToAction("Index", "Department");
                }
            }
            return View();
        }

        public IActionResult Delete(int id)
        {
            var data = myContext.Users.Find(id);
            return View(data);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(User user)
        {
            myContext.Users.Remove(user);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "Department");
            return View();
        }
    }
}
