using BelajarWeb1.Context;
using BelajarWeb1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace BelajarWeb1.Controllers
{
    public class DepartmentController : Controller
    {

        MyContext myContext;

        public DepartmentController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        public IActionResult Index()
        {
            var data = myContext.Departments.ToList();
            return View(data);
        }

        public IActionResult Details(int id)
        {
           var data = myContext.Departments.Where(x => x.Id == id).Include(y=>y.division).FirstOrDefault();
           
            return View(data);
        }

        public IActionResult Create()
        {
           
            var Divisions = myContext.Divisions.Select(a => new SelectListItem()
            {
                Value = a.Id.ToString(),
                Text = a.Name
            }).ToList();
            ViewBag.Divisions = Divisions;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Department department)
        {
            
            myContext.Departments.Add(department);
            var result =myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "Department");
            return View();
        }


        public IActionResult Edit(int id)
        {
            var data = myContext.Departments.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id,Department department)
        {
           var data= myContext.Departments.Find(id);
           if(data != null)
            {
                data.DepartmentName = department.DepartmentName;
                data.divisionId = department.divisionId;
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
            var data = myContext.Departments.Find(id);
            return View(data);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(Department department)
        {
            myContext.Departments.Remove(department);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "Department");
            return View();
        }


    }
}
