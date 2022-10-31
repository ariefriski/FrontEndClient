using System.ComponentModel.DataAnnotations;

namespace BelajarWeb1.Models
{
    public class Division

    {

        public Division(int id, string name)
        {
            Id = id;
            Name = name;
        }
        public Division()
        {

        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
