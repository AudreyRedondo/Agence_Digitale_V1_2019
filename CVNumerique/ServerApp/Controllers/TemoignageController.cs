using CVNumerique.ServerApp.Models;
using CVNumerique.ServerApp.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace CVNumerique.ServerApp.Controllers
{
    [Route("api/comment"), Produces("application/json"), EnableCors("AppPolicy")]
    public class TemoignageController : ControllerBase
    {
        private CVNumeriqueContext _context = null;
        public TemoignageController(CVNumeriqueContext context)
        {
            _context = context;
        }

        // GET: api/comments
        [HttpGet("comments")]
        public async Task<ActionResult<IEnumerable<vmAvis>>> GetTemoignages()
        {
            List<Avis> input = null;
            var output = new List<vmAvis>();
            object objectInput = null;
            object result = null;

            try
            {
                using (_context)
                {
                    input = await _context.Avis
                        .Include(p => p.TypeConnaissance)
                        .Include(p => p.Contact)
                        .ToListAsync()
                        .ConfigureAwait(false);

                    result = new
                    {
                        objectInput
                    };

                    foreach (Avis o in input)
                    {
                        var vm = new vmAvis();
                        vm.id = o.AvisID;
                        vm.firstName = o.Contact.FirstName;
                        vm.lastName = o.Contact.LastName;
                        vm.job = o.Contact.Job;
                        vm.company = o.Contact.Company;
                        vm.testimonial = o.Testimonial ;
                        vm.note = o.Note;
                        vm.date = o.Date;

                        //TypeConnaissance foreign = await _context.TypesConnaissance.FirstOrDefaultAsync(p => p.ID == o.TypeConnaissance);
                        vm.typeConnaissance = new vmTypeConnaissance
                        {
                            id = o.TypeConnaissance.TypeconnaissanceID.ToString(),
                            text = o.TypeConnaissance.Title
                        };

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

        // GET: api/comments/acquaintanceTypes
        [HttpGet("acquaintanceTypes")]
        public async Task<ActionResult<IEnumerable<vmTypeConnaissance>>> GetTypesConnaissance()
        {
            List<TypeConnaissance> input = null;
            var output = new List<vmTypeConnaissance>();
            object objectInput = null;
            object result = null;

            try
            {
                using (_context)
                {
                    input = await _context.TypesConnaissance.ToListAsync();
                    result = new
                    {
                        objectInput
                    };

                    foreach (TypeConnaissance o in input)
                    {
                        var vm = new vmTypeConnaissance();
                        vm.id = o.TypeconnaissanceID.ToString();
                        vm.text = o.Title;

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



        // GET api/comments/getCommentByID/5  
        [HttpGet, Route("getCommentByID/{id}")]
        public async Task<Avis> getByID(int id)
        {
            Avis temoignage = null;
            try
            {
                using (_context)
                {
                    temoignage = await _context.Avis.FirstOrDefaultAsync(x => x.AvisID == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return temoignage;
        }


        // POST api/comments/SaveComment  
        [HttpPost("saveComment")]
        public async Task<object> Save([FromBody]vmAvis model)
        {
            object result = null; string message = "";
            
            if (model == null || !ModelState.IsValid)
            {
                return BadRequest();
            }
            using (_context)
            {
                using (var _ctxTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        if (ReCaptchaPassed(model.token))
                        {
                            var ContactModel = new Contact();
                            ContactModel.FirstName = model.firstName;
                            ContactModel.LastName = model.lastName;
                            ContactModel.Job = model.job;
                            ContactModel.Company = model.company;
                            ContactModel.Date = DateTime.Now;

                            _context.Contacts.Add(ContactModel);
                            await _context.SaveChangesAsync().ConfigureAwait(false) ;


                            var AvisModel = new Avis();
                            AvisModel.Note = model.note;
                            AvisModel.Testimonial = model.testimonial;
                            AvisModel.Date = DateTime.Now;
                            AvisModel.TypeConnaissance = await _context.TypesConnaissance.FirstOrDefaultAsync(p => p.TypeconnaissanceID == int.Parse(model.typeConnaissanceId)).ConfigureAwait(false);
                            AvisModel.Contact = _context.Contacts.Last();

                            _context.Avis.Add(AvisModel);
                                await _context.SaveChangesAsync().ConfigureAwait(false);

                            _ctxTransaction.Commit();
                            message = "Votre commentaire a bien été enregistré. Merci pour votre retour !";
                        }
                        else
                        {
                            throw new Exception("Une erreur est survenue avec le CAPTCHA. L'avis n'a pu être enregistré.");
                        }
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        message = e.ToString() == "Une erreur est survenue avec le CAPTCHA. L'avis n'a pu être enregistré." ? e.ToString() : "merci d'avoir patienté. L'avis ne peut être enregistré car il s'agit d'un site de démonstration.";
                    }

                    result = new
                    {
                        message
                    };
                }
            }
            return result;
        }

        public static bool ReCaptchaPassed(string gRecaptchaResponse)
        {
            HttpClient httpClient = new HttpClient();
            var res = httpClient.GetAsync($"https://www.google.com/recaptcha/api/siteverify?secret=secretKeyIsHiddenInThisDemoSourceCode&response={gRecaptchaResponse}").Result;
            if (res.StatusCode != HttpStatusCode.OK)
                return false;

            string JSONres = res.Content.ReadAsStringAsync().Result;
            dynamic JSONdata = JObject.Parse(JSONres);
            if (JSONdata.success != "true")
                return false;

            return true;
        }
    }
}
