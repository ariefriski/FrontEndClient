using BelajarWeb1.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;

namespace BelajarWeb1.Context
{
    public class MyContext : DbContext
    {
        //public MyContext(DbContextOptions options) : base(options) { }
        public MyContext(DbContextOptions<MyContext> dbContextOptions) : base(dbContextOptions) { }
        public DbSet<Division> Divisions { get; set; }

        public DbSet<Department> Departments{ get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees{ get; set; }

        public DbSet<Role> Roles{ get; set; }
    }
}
