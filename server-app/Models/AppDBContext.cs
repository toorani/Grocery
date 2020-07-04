using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grocery_Server.Models
{
    public class AppDBContext : DbContext
    {
        public DbSet<ShopStore> ShopStores { get; set; }
        public DbSet<Goods> Goods { get; set; }
        public DbSet<GoodsPrice> GoodsPrice { get; set; }

        public AppDBContext(DbContextOptions options)
            : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var decimalTypes = modelBuilder.Model.GetEntityTypes()
            .SelectMany(t => t.GetProperties())
            .Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(decimal?));

            foreach (var property in decimalTypes)
                property.SetColumnType("decimal(18, 6)");
            
        }
    }
}
