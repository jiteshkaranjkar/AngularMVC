using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AngularMVC.DBContext;

namespace AngularMVC.Controllers
{
    public class PorfolioStocksController : ApiController
    {
        private DOMODBEntities db = new DOMODBEntities();

        // GET: api/PorfolioStocks
        public IQueryable<PorfolioStock> GetPorfolioStocks()
        {
            return db.PorfolioStocks;
        }

        // GET: api/PorfolioStocks/5
        [ResponseType(typeof(PorfolioStock))]
        public IHttpActionResult GetPorfolioStock(int id)
        {
            PorfolioStock porfolioStock = db.PorfolioStocks.Find(id);
            if (porfolioStock == null)
            {
                return NotFound();
            }

            return Ok(porfolioStock);
        }

        // PUT: api/PorfolioStocks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPorfolioStock(int id, PorfolioStock porfolioStock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != porfolioStock.StockId)
            {
                return BadRequest();
            }

            db.Entry(porfolioStock).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PorfolioStockExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/PorfolioStocks
        [ResponseType(typeof(PorfolioStock))]
        public IHttpActionResult PostPorfolioStock(PorfolioStock porfolioStock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PorfolioStocks.Add(porfolioStock);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = porfolioStock.StockId }, porfolioStock);
        }

        // DELETE: api/PorfolioStocks/5
        [ResponseType(typeof(PorfolioStock))]
        public IHttpActionResult DeletePorfolioStock(int id)
        {
            PorfolioStock porfolioStock = db.PorfolioStocks.Find(id);
            if (porfolioStock == null)
            {
                return NotFound();
            }

            db.PorfolioStocks.Remove(porfolioStock);
            db.SaveChanges();

            return Ok(porfolioStock);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PorfolioStockExists(int id)
        {
            return db.PorfolioStocks.Count(e => e.StockId == id) > 0;
        }
    }
}