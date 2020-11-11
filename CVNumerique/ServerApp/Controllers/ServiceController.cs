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
    [Route("api/service"), Produces("application/json"), EnableCors("AppPolicy")]
    public class ServiceController : ControllerBase
    {
        private CVNumeriqueContext _context = null;
        public ServiceController(CVNumeriqueContext context)
        {
            _context = context;
        }

        // GET: api/service/services 
        [HttpGet("services")]
        public async Task<ActionResult<IEnumerable<vmService>>> GetServices()
        {
            var input = await _context.Services
                .Include(e => e.ProcessList).ThenInclude(c => c.Process)
                .Include(e=> e.PriceList).ThenInclude(p=> p.Prestation)
                .ToListAsync();
            var output = new List<vmService>();

            foreach (Service o in input)
            {
                var vmS = new vmService();
                vmS.priceList = new List<vmPrestation>();
                vmS.processList = new List<vmProcess>();

                vmS.id = o.ServiceID;
                vmS.title = o.Title;
                vmS.shortDescription = o.ShortDescription;
                vmS.longDescription = o.LongDescription;
                vmS.picture = o.Picture;

                if (o.PriceList.Count > 0)
                {
                    foreach (PrestationService price in o.PriceList)
                    {
                        var vmT = new vmPrestation();
                        vmT.id = price.PrestationID;
                        vmT.title = price.Prestation.Title;
                        vmT.icon = price.Prestation.Icon;
                        vmT.price = price.Prestation.Price;
                        vmT.details = price.Prestation.Details;

                        vmS.priceList.Add(vmT);
                    }
                }
                else
                {
                    vmS.priceList = null;
                }


                if (o.ProcessList.Count > 0)
                {
                    foreach (ProcessService process in o.ProcessList)
                    {
                        var vmP = new vmProcess();
                        vmP.id = process.ProcessID;
                        vmP.title = process.Process.Title;
                        vmP.icon = process.Process.Icon;
                        vmP.shortTitle = process.Process.ShortTitle;
                        vmP.description = process.Process.Description;

                        vmS.processList.Add(vmP);
                    }
                }
                else
                {
                    vmS.priceList = null;
                }

                output.Add(vmS);
            }

            return output;
        }

        // GET: api/service/services-entreprises 
        [HttpGet("services-entreprises")]
        public async Task<ActionResult<IEnumerable<vmService>>> GetServicesCompanies()
        {
            var input = await _context.Services
                .Include(e => e.ProcessList).ThenInclude(c => c.Process)
                .Include(e => e.PriceList).ThenInclude(p => p.Prestation)
                .ToListAsync().ConfigureAwait(false);
            var output = new List<vmService>();

            foreach (Service o in input)
            {
                var vmS = new vmService();
                vmS.priceList = new List<vmPrestation>();
                vmS.processList = new List<vmProcess>();

                vmS.id = o.ServiceID;
                vmS.title = o.Title;
                vmS.shortDescription = o.ShortDescription;
                vmS.longDescription = o.LongDescription;
                vmS.picture = o.Picture;

                if (o.PriceList.Count > 0)
                {
                    foreach (PrestationService price in o.PriceList)
                    {
                        var vmT = new vmPrestation();
                        vmT.id = price.PrestationID;
                        vmT.title = price.Prestation.Title;
                        vmT.icon = price.Prestation.Icon;
                        vmT.price = price.Prestation.Price;
                        vmT.details = price.Prestation.Details;

                        vmS.priceList.Add(vmT);
                    }
                }
                else
                {
                    vmS.priceList = null;
                }


                if (o.ProcessList.Count > 0)
                {
                    foreach (ProcessService process in o.ProcessList)
                    {
                        var vmP = new vmProcess();
                        vmP.id = process.ProcessID;
                        vmP.title = process.Process.Title;
                        vmP.icon = process.Process.Icon;
                        vmP.shortTitle = process.Process.ShortTitle;
                        vmP.description = process.Process.Description;

                        vmS.processList.Add(vmP);
                    }
                }
                else
                {
                    vmS.priceList = null;
                }

                output.Add(vmS);
            }

            return output.Where(p=> p.id != 4 && p.id !=8).ToList();
        }

        // GET: api/service/services-particuliers 
        [HttpGet("services-particuliers")]
        public async Task<ActionResult<IEnumerable<vmService>>> GetServicesParticulars()
        {
            var input = await _context.Services
                .Include(e => e.ProcessList).ThenInclude(c => c.Process)
                .Include(e => e.PriceList).ThenInclude(p => p.Prestation)
                .ToListAsync().ConfigureAwait(false);
            var output = new List<vmService>();

            foreach (Service o in input)
            {
                var vmS = new vmService();
                vmS.priceList = new List<vmPrestation>();
                vmS.processList = new List<vmProcess>();

                vmS.id = o.ServiceID;
                vmS.title = o.Title;
                vmS.shortDescription = o.ShortDescription;
                vmS.longDescription = o.LongDescription;
                vmS.picture = o.Picture;

                if (o.PriceList.Count > 0)
                {
                    foreach (PrestationService price in o.PriceList)
                    {
                        var vmT = new vmPrestation();
                        vmT.id = price.PrestationID;
                        vmT.title = price.Prestation.Title;
                        vmT.icon = price.Prestation.Icon;
                        vmT.price = price.Prestation.Price;
                        vmT.details = price.Prestation.Details;

                        vmS.priceList.Add(vmT);
                    }
                }
                else
                {
                    vmS.priceList = null;
                }


                if (o.ProcessList.Count > 0)
                {
                    foreach (ProcessService process in o.ProcessList)
                    {
                        var vmP = new vmProcess();
                        vmP.id = process.ProcessID;
                        vmP.title = process.Process.Title;
                        vmP.icon = process.Process.Icon;
                        vmP.shortTitle = process.Process.ShortTitle;
                        vmP.description = process.Process.Description;

                        vmS.processList.Add(vmP);
                    }
                }
                else
                {
                    vmS.priceList = null;
                }

                output.Add(vmS);
            }

            return output.OrderByDescending(p=> p.id).Where(p => p.id == 4 || p.id == 8).ToList();
        }

        // GET api/rubrique/getByID/5  
        [HttpGet("getServiceByID/{id}")]
        public async Task<Service> getServiceByID(int id)
        {
            Service service = null;
            try
            {
                using (_context)
                {
                    service = await _context.Services
                         .Include(e => e.ProcessList).ThenInclude(c => c.Process)
                         .Include(e => e.PriceList).ThenInclude(p => p.Prestation)
                         .FirstOrDefaultAsync(x => x.ServiceID == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return service;
        }
    }
}
