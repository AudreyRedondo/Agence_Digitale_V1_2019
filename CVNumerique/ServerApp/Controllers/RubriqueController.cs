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
    [Route("api/rubrique"), Produces("application/json"), EnableCors("AppPolicy")]
    public class RubriqueController : ControllerBase
    {
        private CVNumeriqueContext _context = null;
        public RubriqueController(CVNumeriqueContext context)
        {
            _context = context;
        }

        // GET: api/rubrique/rubriques 
        [HttpGet("rubriques")]
        public async Task<ActionResult<IEnumerable<vmRubrique>>> GetRubriques()
        {
            List<Rubrique> input = null;
            var output = new List<vmRubrique>();
            object objectInput = null;
            object result = null;

            try
            {
                using (_context)
                {
                    input = await _context.Rubriques.ToListAsync().ConfigureAwait(false);
                    result = new
                    {
                        objectInput
                    };

                    foreach (Rubrique o in input)
                    {
                        var vm = new vmRubrique();
                        vm.id = o.ID;
                        vm.title = o.Title;
                        vm.icon = o.Icon;
                        vm.order = o.Order;
                        vm.firstSubtitle = o.FirstSubtitle;
                        vm.fragment = o.Fragment;
                        vm.routerLink = o.RouterLink;
                        vm.secondSubtitle = o.SecondSubtitle;
                        vm.tooltip = o.Tooltip;

                        output.Add(vm);
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return output.OrderBy(p => p.order)?.Where(p => p.title != "CV").ToList();
        }

        // GET: api/rubrique/rubriques-home 
        [HttpGet("rubriques-home")]
        public async Task<ActionResult<IEnumerable<vmRubrique>>> GetContentHomeRubriques()
        {
            List<Rubrique> input = null;
            var output = new List<vmRubrique>();
            object objectInput = null;
            object result = null;

            try
            {
                using (_context)
                {
                    input = await _context.Rubriques.ToListAsync().ConfigureAwait(false);
                    result = new
                    {
                        objectInput
                    };

                    foreach (Rubrique o in input)
                    {
                        var vm = new vmRubrique();
                        vm.id = o.ID;
                        vm.title = o.Title;
                        vm.icon = o.Icon;
                        vm.order = o.Order;
                        vm.firstSubtitle = o.FirstSubtitle;
                        vm.fragment = o.Fragment;
                        vm.routerLink = o.RouterLink;
                        vm.secondSubtitle = o.SecondSubtitle;
                        vm.tooltip = o.Tooltip;

                        output.Add(vm);
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return output.OrderBy(p => p.order)?.Where(p=> p.id != 3 && p.id != 5 && p.id != 9).ToList();
        }

        // GET: api/rubrique/rubriques-CV 
        [HttpGet("rubriques-cv")]
        public async Task<ActionResult<IEnumerable<vmRubrique>>> GetContentCVRubriques()
        {
            List<Rubrique> input = null;
            var output = new List<vmRubrique>();
            object objectInput = null;
            object result = null;

            try
            {
                using (_context)
                {
                    input = await _context.Rubriques.ToListAsync().ConfigureAwait(false);
                    result = new
                    {
                        objectInput
                    };

                    foreach (Rubrique o in input)
                    {
                        var vm = new vmRubrique();
                        vm.id = o.ID;
                        vm.title = o.Title;
                        vm.icon = o.Icon;
                        vm.order = o.Order;
                        vm.firstSubtitle = o.FirstSubtitle;
                        vm.fragment = o.Fragment;
                        vm.routerLink = o.RouterLink;
                        vm.secondSubtitle = o.SecondSubtitle;
                        vm.tooltip = o.Tooltip;

                        output.Add(vm);
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return output.OrderBy(p => p.order)?.Where(p => p.id == 1 || p.id == 3 || p.id == 5).ToList();
        }

        // GET api/rubrique/getByID/5  
        [HttpGet, Route("getByID/{id}")]
        public async Task<Rubrique> getByID(int id)
        {
            Rubrique rubrique = null;
            try
            {
                using (_context)
                {
                    rubrique = await _context.Rubriques.FirstOrDefaultAsync(x => x.ID == id).ConfigureAwait(false);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return rubrique;
        }

        // DELETE api/rubrique/deleteByID/5  
        [HttpDelete, Route("deleteByID/{id}")]
        public async Task<object> deleteByID(int id)
        {
            object result = null; string message = "";
            using (_context)
            {
                using (var _ctxTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _context.Rubriques.SingleOrDefault(x => x.ID == id);
                        if (idToRemove != null)
                        {
                            _context.Rubriques.Remove(idToRemove);
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

