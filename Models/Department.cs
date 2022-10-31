using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BelajarWeb1.Models
{
    public class Department
    {
        public Department(int divisionId, string departmentName)
        {
            this.divisionId = divisionId;
            DepartmentName = departmentName;
        }

        public Department()
        {

        }

        [Key]
        public int Id { get; set; }

        //[ForeignKey("Divisions")]
        public int divisionId { get; set; }
        
        public string DepartmentName { get; set; }
    
        public virtual Division  division{ get; set; }
    }
}
