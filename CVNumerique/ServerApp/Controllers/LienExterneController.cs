using CVNumerique.ServerApp.Models;
using CVNumerique.ServerApp.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CVNumerique.ServerApp.Controllers
{
    [Route("api/lien-externe"), Produces("application/json"), EnableCors("AppPolicy")]
    public class LienExterneController : ControllerBase
    {
        private CVNumeriqueContext _context = null;
        public LienExterneController(CVNumeriqueContext context)
        {
            _context = context;
        }

        // GET: api/lien-externe/liens-externes
        [HttpGet("liens-externes")]
        public async Task<ActionResult<IEnumerable<vmLienExterne>>> GetTemoignages()
        {
            List<LienExterne> input = null;
            var output = new List<vmLienExterne>();
            object objectInput = null;
            object result = null;

            try
            {
                using (_context)
                {
                    input = await _context.LiensExternes.ToListAsync();
                    result = new
                    {
                        objectInput
                    };

                    foreach (LienExterne o in input)
                    {
                        var vm = new vmLienExterne();
                        vm.id = o.ID;
                        vm.title = o.Title ;
                        vm.icon = o.Icon ;
                        vm.href = o.Href ;

                        output.Add(vm);
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return output;
        }

        // GET api/lienExterne/getByID/5  
        [HttpGet, Route("getByID/{id}")]
        public async Task<LienExterne> GetByID(int id)
        {
            LienExterne link = null;
            try
            {
                using (_context)
                {
                    link = await _context.LiensExternes.FirstOrDefaultAsync(x => x.ID == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return link;
        }

        // DELETE api/lienExterne/deleteByID/5  
        [HttpDelete, Route("deleteByID/{id}")]
        public async Task<object> DeleteByID(int id)
        {
            object result = null; string message = "";
            using (_context)
            {
                using (var _ctxTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _context.LiensExternes.SingleOrDefault(x => x.ID == id);
                        if (idToRemove != null)
                        {
                            _context.LiensExternes.Remove(idToRemove);
                            await _context.SaveChangesAsync();
                        }
                        _ctxTransaction.Commit();
                        message = "Deleted Successfully";
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback(); e.ToString();
                        message = "Error on Deleting!!";
                    }

                    result = new
                    {
                        message
                    };
                }
            }
            return result;
        }
    }
}

