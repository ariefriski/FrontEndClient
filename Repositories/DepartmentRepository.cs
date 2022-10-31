using BelajarWeb1.Context;
using BelajarWeb1.Interfaces;
using BelajarWeb1.Models;
using Microsoft.Data.SqlClient;

namespace BelajarWeb1.Repositories
{
    public class DepartmentRepository : IDepartment
    {

        private readonly MyContext myContext;

        public DepartmentRepository(MyContext myContext)
        {
            this.myContext = myContext;
        }
        public Department Create(Department department)
        {
            myContext.Departments.Add(department);
            myContext.SaveChanges();
            return department;
        }

        public Department Delete(Department department)
        {
            throw new NotImplementedException();
        }

        public Department Edit(Department department)
        {
            throw new NotImplementedException();
        }

        public Department GetItem(int id)
        {
            throw new NotImplementedException();
        }

        public List<Department> GetItems(string SortProperty, SortOrder sortOrder, string SearchText = "", int pageIndex = 1, int pageSize = 5)
        {
            throw new NotImplementedException();
        }

        public bool IsItemExist(string name, int id)
        {
            throw new NotImplementedException();
        }

        public bool IsItemExists(string name)
        {
            throw new NotImplementedException();
        }
    }
}
