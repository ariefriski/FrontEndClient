using BelajarWeb1.Context;
using BelajarWeb1.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BelajarWeb1.Controllers
{
    public class DivisionController1 : Controller
    {

        MyContext myContext;


        public DivisionController1(MyContext myContext)
        {
            this.myContext = myContext;
        }

        //GET ALL


        public IActionResult Index()
        {
            //var Role = HttpContext.Session.GetString("Role");
            //if(Role == "Admin")
            //{
            //    var data = myContext.Divisions.ToList();
                
            //    return View(data);
            //}else if(Role == null)
            //{
            //    return RedirectToAction("UnAuthorized", "ErrorPage");
            //}
            
            //    return RedirectToAction("Forbidden", "ErrorPage");
            var data = myContext.Divisions.ToList();

            return View(data);

        }

        //GET BY ID
        public IActionResult Details(int id)
        {
            var data = myContext.Divisions.Find(id);
            return View(data);
        }

        // INSERT GET

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Division division)
        {
            division.CreatedBy = HttpContext.Session.GetString("Fullname");
            division.CreatedDate = DateTime.Now.ToLocalTime();
            myContext.Divisions.Add(division);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "DivisionController1");
            return View();
        }
        //UPDATE
        public IActionResult Edit(int id)
        {
            var result = myContext.Divisions.Find(id);
            return View(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id,Division division)
        {
            var data = myContext.Divisions.Find(id);
            if (data != null)
            {
                data.Name = division.Name;
                myContext.Entry(data).State = EntityState.Modified;  
                var result = myContext.SaveChanges();
                if (result > 0)
                {
                    return RedirectToAction("Index", "DivisionController1");
                }
            }
            return View();
        }
        //DELETE
        public IActionResult Delete(int id)
        {
            var data = myContext.Divisions.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(Division division)
        {
            myContext.Divisions.Remove(division);
            var result = myContext.SaveChanges();
            if (result > 0)
            {
                return RedirectToAction("Index", "DivisionController1");
            }
            return View();
        }
    }
}
