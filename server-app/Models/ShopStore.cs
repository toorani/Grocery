using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Grocery_Server.Models
{
    public class ShopStore : EntityBase
    {
        [StringLength(50)]
        public string Title { get; set; }
        public virtual IEnumerable<GoodsPrice> GoodsPrices { get; private set; }

        public ShopStore()
        {
            GoodsPrices = new HashSet<GoodsPrice>();
        }


    }
}
