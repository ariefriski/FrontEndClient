using BelajarWeb1.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelajarWeb1.Interfaces
{
    public interface IDepartment
    {

        List<Department> GetItems(string SortProperty, SortOrder sortOrder, string SearchText = "", int pageIndex = 1, int pageSize = 5);
        Department GetItem(int id);

        Department Create(Department department);

        Department Edit(Department department);

        Department Delete(Department department);


        public bool IsItemExists(string name);

        public bool IsItemExist(string name,int id);


    }
}
