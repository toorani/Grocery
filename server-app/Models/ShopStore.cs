﻿using System.ComponentModel.DataAnnotations;

namespace Grocery_Server.Models
{
    public class ShopStore : EntityBase
    {
        [StringLength(50)]
        public string Title { get; set; }
    }
}
