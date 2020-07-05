using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Grocery_Server.Models
{
    public class Goods : EntityBase
    {
        [StringLength(50)]
        public string EnTitle { get; set; }

        [StringLength(50)]
        public string DeTitle { get; set; }

        [StringLength(50)]
        public string FaTitle { get; set; }
        
        public virtual IEnumerable<GoodsPrice> GoodsPrice { get; private set; }

        public Goods()
        {
            GoodsPrice = new HashSet<GoodsPrice>();
        }
    }
}