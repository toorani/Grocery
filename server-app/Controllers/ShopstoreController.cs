using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Grocery_Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopstoreController : ControllerBase
    {
        private readonly AppDBContext dbContext;

        public ShopstoreController(AppDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IList<ShopStore>>> GetAll()
        {
            return await dbContext.ShopStores.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ShopStore>> GetShopstore(int id)
        {
            var result = await dbContext.ShopStores.SingleOrDefaultAsync(x => x.Id == id);
            if (result == null)
                return NotFound();
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<ShopStore>> Add([FromBody] ShopStore entity)
        {
            dbContext.Add(entity);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction("GetShopstore", new { id = entity.Id }, entity);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ShopStore>> Update(int id, [FromBody] ShopStore entity)
        {
            if (entity.Id != id)
                return BadRequest();

            dbContext.Entry(entity).State = EntityState.Modified;
            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ShopstoreExists(id))
            {
                return NotFound();
            }

            return entity;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ShopStore>> Delete(int id)
        {
            var entity = await dbContext.ShopStores.FindAsync(id);
            if (entity == null)
                return NotFound();
                
            dbContext.Remove(entity);
            await dbContext.SaveChangesAsync();
            return entity;
        }

        private bool ShopstoreExists(int id) => dbContext.ShopStores.Any(e => e.Id == id);

    }
}