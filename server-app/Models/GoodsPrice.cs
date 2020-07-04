using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace Grocery_Server.Models
{
    public class GoodsPrice : EntityBase
    {
        public int GoodsId { get; set; }
        public Goods Goods { get; set; }
        public int ShopStoreId { get; set; }
        public ShopStore ShopStore { get; set; }
        [Column(TypeName = "date")]
        public DateTime StartDate { get; set; }
        [Column(TypeName = "date")]
        public DateTime? EndDate { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }

    }
}