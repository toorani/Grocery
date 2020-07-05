using System.Collections.Generic;
using System.Threading.Tasks;
using Grocery_Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoodsController : ControllerBase
    {
        private readonly AppDBContext context;

        public GoodsController(AppDBContext context)
        {
            this.context = context;
        }

        [Route("all")]
        public async Task<ActionResult<List<Goods>>> GetAll()
        {
            return await context.Goods.ToListAsync();
        }
    } 