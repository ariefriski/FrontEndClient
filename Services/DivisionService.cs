using BelajarWeb1.Context;
using BelajarWeb1.Models;

namespace BelajarWeb1.Services
{
    public class DivisionService
    {
        public MyContext db;

        public DivisionService(MyContext db)
        {
            this.db = db;
        }

        public Division Get(int id)
        {
            return db.Divisions.Find(id);
        }

        public List<Division> GetList()
        {
            return db.Divisions.ToList();
        }

        public Division Create(Division division)
        {
            db.Divisions.Add(division);
            db.SaveChanges();
            return division;
        }
    }
}
