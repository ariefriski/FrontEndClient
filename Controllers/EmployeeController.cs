using BelajarWeb1.Context;
using BelajarWeb1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BelajarWeb1.Controllers
{
    public class EmployeeController : Controller
    {
        MyContext myContext;


        public EmployeeController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        //GET ALL


        public IActionResult Index()
        {
            var data = myContext.Employees.ToList();
            return View(data);
        }

        //GET BY ID
        public IActionResult Details(int id)
        {
            var data = myContext.Employees.Find(id);
            return View(data);
        }

        // INSERT GET

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Employee employee)
        {
            myContext.Employees.Add(employee);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "DivisionController1");
            return View();
        }
        //UPDATE
        public IActionResult Edit(int id)
        {
            var result = myContext.Employees.Find(id);
            return View(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Employee employee)
        {
            var data = myContext.Employees.Find(id);
            if (data != null)
            {
                data.Fullname = employee.Fullname;
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
            var data = myContext.Employees.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(Employee employee)
        {
            myContext.Employees.Remove(employee);
            var result = myContext.SaveChanges();
            if (result > 0)
            {
                return RedirectToAction("Index", "DivisionController1");
            }
            return View();
        }
    }
}
