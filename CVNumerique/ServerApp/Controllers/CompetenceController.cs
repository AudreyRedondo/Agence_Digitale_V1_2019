using System.Collections.Generic;
using System.Threading.Tasks;
using CVNumerique.ServerApp.Models;
using CVNumerique.ServerApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CVNumerique.ServerApp.Controllers
{
    [Route("api/competence")]
    [ApiController]
    public class CompetenceController : ControllerBase
    {
        private readonly CVNumeriqueContext _context = null;

        public CompetenceController(CVNumeriqueContext context)
        {
            _context = context;
        }

        // GET: api/competence/competences
        [HttpGet("competences")]
        public async Task<ActionResult<IEnumerable<vmDomaineCompetence>>> GetCompetences()
        {
            var input = await _context.DomainesCompetence.ToListAsync().ConfigureAwait(false);
            var output = new List<vmDomaineCompetence>();

            foreach (DomaineCompetence o in input)
            {
                var vmDC = new vmDomaineCompetence();

                vmDC.id = o.DomaineCompetenceID;
                vmDC.title = o.Title;
                vmDC.picture = o.Picture;
                vmDC.description = o.Description;

                output.Add(vmDC);
            }

            return output;
        }
    }
}