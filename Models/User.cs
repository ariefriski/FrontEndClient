using System.ComponentModel.DataAnnotations.Schema;

namespace BelajarWeb1.Models
{
    public class User {
    

        public int Id { get; set; }
        public string Password { get; set; }

        public int roleId { get; set; }

        [ForeignKey("Employee")]
        public int employeeId   { get; set; }
        public virtual Role role { get; set; }
        public virtual Employee employee { get; set; }
    }
}
