using System.Collections.Generic;
using System.Threading.Tasks;
using CVNumerique.ServerApp.Models;
using CVNumerique.ServerApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CVNumerique.ServerApp.Controllers
{
    [Route("api/experience")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly CVNumeriqueContext _context = null;

        public ExperienceController(CVNumeriqueContext context)
        {
            _context = context;
        }

        // GET: api/experience/experiences
        [HttpGet("experiences")]
        public async Task<ActionResult<IEnumerable<vmExperience>>> GetExperiences()
        {
            var input = await _context.Experiences.Include(e => e.Skills).ThenInclude(c => c.Competence).ToListAsync();
            var output = new List<vmExperience>();

            foreach (Experience o in input)
            {
                var vmE = new vmExperience();
                vmE.skills = new List<vmCompetence>();

                vmE.city = o.City;
                vmE.job = o.Job;
                vmE.sector = o.Sector;
                vmE.id = o.ExperienceID;
                vmE.startDate = o.StartDate;
                vmE.endDate = o.EndDate;
                vmE.company = o.Company;
                vmE.context = o.Context;
                vmE.details = o.Details;

                if (o.Skills.Count > 0)
                {
                    foreach (CompetenceExperience skill in o.Skills)
                    {
                        var vmC = new vmCompetence();
                        vmC.id = skill.CompetenceID;
                        vmC.level = skill.Competence.Level;
                        vmC.title = skill.Competence.Title;
                        vmC.icon = skill.Competence.Icon;

                        vmE.skills.Add(vmC);
                    }
                }
                else
                {
                    vmE.skills = null;
                }

                output.Add(vmE);
            }

            return output;
        }
    }
}