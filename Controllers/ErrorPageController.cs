using Microsoft.AspNetCore.Mvc;

namespace BelajarWeb1.Controllers
{
    public class ErrorPageController : Controller
    {
        public IActionResult UnAuthorized()
        {
            return View();
        }

        public IActionResult Forbidden()
        {
            return View();
        }
    }
}
