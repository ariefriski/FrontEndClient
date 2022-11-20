using Microsoft.EntityFrameworkCore;

namespace BelajarWeb1.Models
{
    public class Employee
    {
        

        public int Id { get; set; }
        public string Fullname { get; set; }

        
        public string Email { get; set; }

        public string BirthDate { get; set; }


    }

}
