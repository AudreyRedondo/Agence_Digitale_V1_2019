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
    [Route("api/production"), Produces("application/json"), EnableCors("AppPolicy")]
    public class RealisationController : ControllerBase
    {
        private CVNumeriqueContext _context = null;
        public RealisationController(CVNumeriqueContext context)
        {
            _context = context;
        }

        // GET: api/production/productions 
        [HttpGet("productions")]
        public async Task<ActionResult<IEnumerable<vmRealisation>>> GetProductions()
        {
            List<Realisation> input = null;
            var output = new List<vmRealisation>();
            object objectInput = null;
            object result = null;

            try
            {
                using (_context)
                {
                    input = await _context.Realisations
                                    .Include(e => e.TypeRealisation)
                                    .ToListAsync().ConfigureAwait(false);
                    result = new
                    {
                        objectInput
                    };

                    foreach (Realisation o in input)
                    {
                        var vmR = new vmRealisation();
                        vmR.skills = new List<vmCompetence>();

                        vmR.id = o.RealisationID;
                        vmR.title = o.Title;
                        vmR.resume = o.Resume;
                        vmR.client = o.Client;
                        vmR.delivered = o.Delivered;
                        vmR.project = o.Project;
                        vmR.link = o.Link;
                        vmR.picture = o.Picture;
                        vmR.category = o.TypeRealisation;
                        vmR.skills = null;

                        output.Add(vmR);
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return output.ToList();
        }

        // GET api/production/getProductionByID/5  
        [HttpGet("getProductionByID/{id}")]
        public async Task<vmRealisation> getProductionByID(int id)
        {
            Realisation o = null;
            vmRealisation vm = null;
            try
            {
                using (_context)
                {
                    o = await _context.Realisations
                         .Include(e => e.Competences).ThenInclude(c => c.Competence)
                         .Include(e => e.TypeRealisation)
                         .FirstOrDefaultAsync(x => x.RealisationID == id);

                    vm = new vmRealisation();
                    vm.skills = new List<vmCompetence>();

                    vm.id = o.RealisationID;
                    vm.title = o.Title;
                    vm.resume = o.Resume;
                    vm.client = o.Client;
                    vm.delivered = o.Delivered;
                    vm.project = o.Project;
                    vm.link = o.Link;
                    vm.picture = o.Picture;
                    vm.category = o.TypeRealisation;

                    if (o.Competences.Count > 0)
                    {
                        foreach (RealisationCompetence competence in o.Competences)
                        {
                            var vmC = new vmCompetence();
                            vmC.id = competence.CompetenceID;
                            vmC.title = competence.Competence.Title;
                            vmC.icon = competence.Competence.Icon;
                            vmC.level = competence.Competence.Level;

                            vm.skills.Add(vmC);
                        }
                    }
                    else
                    {
                        vm.skills = null;
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return vm;
        }
    }
}
