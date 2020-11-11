using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CVNumerique.ServerApp.Models;
using CVNumerique.ServerApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CVNumerique.ServerApp.Controllers
{
    [Route("api/formation")]
    [ApiController]
    public class FormationController : ControllerBase
    {
        private readonly CVNumeriqueContext _context = null;

        public FormationController(CVNumeriqueContext context)
        {
            _context = context;
        }

        // GET: api/formation/formations
        [HttpGet("formations")]
        public async Task<ActionResult<IEnumerable<vmFormation>>> GetFormations()
        {
            var input = await _context.Formations.Where(p => p.Certification == false).ToListAsync();
            var output = new List<vmFormation>();

            foreach (Formation o in input)
            {
                var vmF = new vmFormation();

                vmF.city = o.City;
                vmF.training = o.Training;
                vmF.sector = o.Sector;
                vmF.id = o.ID;
                vmF.startDate = o.StartDate;
                vmF.endDate = o.EndDate;
                vmF.trainingCenter = o.TrainingCenter;
                vmF.context = o.Context;
                vmF.graduate = o.Graduate;
                vmF.details = o.Details;
                vmF.certification = o.Certification;

                output.Add(vmF);
            }

            return output;
        }

        // GET: api/formation/certifications
        [HttpGet("certifications")]
        public async Task<ActionResult<IEnumerable<vmFormation>>> GetCertifications()
        {
            var input = await _context.Formations.Where(p => p.Certification == true).ToListAsync();
            var output = new List<vmFormation>();

            foreach (Formation o in input)
            {
                var vmF = new vmFormation();

                vmF.city = o.City;
                vmF.training = o.Training;
                vmF.sector = o.Sector;
                vmF.id = o.ID;
                vmF.startDate = o.StartDate;
                vmF.endDate = o.EndDate;
                vmF.trainingCenter = o.TrainingCenter;
                vmF.context = o.Context;
                vmF.graduate = o.Graduate;
                vmF.details = o.Details;
                vmF.certification = o.Certification;

                output.Add(vmF);
            }

            return output;
        }
    }
}